	require("@syncfusion/ej2-staging");
const { clean, restore, build } = require('gulp-dotnet-cli');
const shelljs = require('shelljs');
const fs = require('fs');
const gulp = require('gulp');
const glob = require('glob');
const fastGlob = require('fast-glob');
const xml2js = require('xml2js');
const path = require('path');
const table = require('table');
const SCRIPTS = ['js'];
const STYLES = ['css'];
const IMAGES = ['png', 'svg', 'gif', 'emf', 'tif', 'bmp', 'webp'];
const FOLDERS = ['scripts', 'styles', 'images', 'data'];
const FONTS = ['ttf', 'woff', 'woff2', 'eot', 'svg'];
const zipFolder = require('zip-folder');
const REGEX = /[A-Z]|_|\s/g;
const DATA = SCRIPTS.concat(STYLES, IMAGES, FONTS, ['jpg']);
const ASSET_PATH = './Common/wwwroot/';
const ServerNugetPath = './Blazor-Server-Demos/NuGet.config';
const WasmNugetPath = './Blazor-WASM-Demos/Blazor_WASM_Demos/NuGet.config';
const ServerProjectPath_NET8 = './Blazor-Server-Demos/Blazor_Server_Demos_NET8.csproj';
const ServerProjectPath_NET9 = './Blazor-Server-Demos/Blazor_Server_Demos_NET9.csproj';
const ServerProjectPath_NET10 = './Blazor-Server-Demos/Blazor_Server_Demos_NET10.csproj';
const ServerCommonPath_NET8 = './Common/Blazor_Server_Common_NET8.csproj';
const ServerCommonPath_NET9 = './Common/Blazor_Server_Common_NET9.csproj';
const ServerCommonPath_NET10 = './Common/Blazor_Server_Common_NET10.csproj';
const WasmProjectPath_NET8 = './Blazor-WASM-Demos/Blazor_WASM_Demos/Blazor_WASM_Demos_NET8.csproj';
const WasmProjectPath_NET9 = './Blazor-WASM-Demos/Blazor_WASM_Demos/Blazor_WASM_Demos_NET9.csproj';
const WasmProjectPath_NET10 = './Blazor-WASM-Demos/Blazor_WASM_Demos/Blazor_WASM_Demos_NET10.csproj';
var currentBranchName = process.env.githubSourceBranch || process.env.BRANCH_NAME || shelljs.exec('git rev-parse --abbrev-ref HEAD', { silent: true }).stdout.trim();
var isReleaseBranch = /^((release\/))/g.test(currentBranchName);
var isHotfixBranch = /^((hotfix\/))/g.test(currentBranchName);

var hasErrors;
var rootFolder;
var folders = [];
var fileNames = [];
var dataFiles = [];
var styleFiles = [];
var imageFiles = [];
var scriptFiles = [];
var rootFolders = [];

gulp.task('static-assets', (done) => {
    var files = glob.sync(`${ASSET_PATH}**`);
    var parentFolder;
    files.forEach((filePath) => {
        var stat = fs.lstatSync(filePath);
        var baseName = path.basename(filePath);
        if (stat.isDirectory()) {
            parentFolder = baseName;
            var splitted = filePath.split('/');
            // Check root folder names
            if (splitted.length === 4) {
                rootFolder = baseName;
                if (FOLDERS.indexOf(baseName) === -1) {
                    rootFolders.push(baseName);
                }
            }
            // Check folder naming standards
            if (checkFileName(baseName)) {
                folders.push(getFilePath(filePath));
            }
        } else {
            if (filePath.endsWith('styles/favicon.ico')) {
                return;
            }
            var extName = path.extname(baseName).split('.')[1];
            // Check file naming standard
            if (checkFileName(baseName)) {
                fileNames.push(getFilePath(filePath));
            }
            // Check script files naming standard
            if (SCRIPTS.indexOf(extName) !== -1 && rootFolder !== 'scripts') {
                scriptFiles.push(getFilePath(filePath))
            }
            // Check styles files naming standard
            if (STYLES.indexOf(extName) !== -1 && rootFolder !== 'styles') {
                styleFiles.push(getFilePath(filePath))
            }
            // Check image files naming standard
            var isFontFile = FONTS.indexOf(extName) !== -1 && parentFolder === 'fonts' && rootFolder === 'styles';
            if (!isFontFile && ((IMAGES.indexOf(extName) !== -1 && rootFolder !== 'images') || (rootFolder === 'images' && extName === 'jpg'))) {
                imageFiles.push(getFilePath(filePath))
            }
            // Check data files naming standard
            if (DATA.indexOf(extName) === -1 && rootFolder !== 'data') {
                dataFiles.push(getFilePath(filePath))
            }
        }
    });
    generateReport(done);
});

gulp.task('warnings', (done) => {
    var reportPath = __dirname + '/warnings.log';
    console.log(reportPath);
    if (fs.existsSync(reportPath)) {
        var reportLog = fs.readFileSync(reportPath, 'utf8');
        var warnings = reportLog.match(/(.*?) warning (.*)/g);
        if (!warnings) {
            console.log("!!! No Warning Throws !!!")
            done();
        }
        else {
            console.log('\nTotal Warnings: ' + warnings.length + '\n\n');
            var tableData = [];
            for (var i = 0; i < warnings.length; i++) {
                try {
                    var fileName = warnings[i].match(/(.*)\)\: |(.*) \: /)[0].replace(':', '').trim();
                    var warningCode = warnings[i].match(/\: \warning (.*)\: (\'[a-zA-Z]|[a-zA-Z])/)[1];
                    if (warningCode.indexOf(':') !== -1) {
                        warningCode = warningCode.split(':')[0];
                    }
                    var descRegex = new RegExp(`${warningCode}: (.*)`);
                    var description = warnings[i].match(descRegex)[1].replace(/\[(.*)\]/, '').trim();
                    tableData.push([fileName, warningCode, description]);
                }
                catch (e) {
                    console.log('\n' + warnings[i] + '\n');
                    console.log('\n' + e + '\n');
                }
            }
            var config = {
                columns: {
                    0: {
                        width: 50
                    },
                    1: {
                        width: 10
                    },
                    2: {
                        width: 150
                    }
                }
            };
            tableOutput = table.table(tableData, config);
            console.log(tableOutput);

            done();
            process.exit(1);
        }
    }
    else {
        console.log("Report file not found");
        done();
    }
});

const SITEMAP_TEMPLATE = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{{URLS}}
</urlset>`;

const SITE_URL = `
    <url>
        <loc>{{:DemoPath}}</loc>
        <lastmod>{{:Date}}</lastmod>
    </url>`;

const LOCAL_SITE_URL = `
    <url>
        <type>{{:Type}}</type>
        <loc>{{:DemoPath}}</loc>
        <lastmod>{{:Date}}</lastmod>
    </url>`;

gulp.task('sitemap-generate', function (done) {
    var siteMapFile = SITEMAP_TEMPLATE;
    var combinedUrl = '';
    var date = new Date().toISOString().substring(0, 10);
    var path = 'https://blazor.syncfusion.com/demos/';
    var files = fastGlob.sync('./Common/Pages/**/SampleList.cs', { ignore: ['./Common/Pages/SampleList.cs'], caseSensitiveMatch: false });
    for (var i = 0; i < files.length; i++) {
        var file = fs.readFileSync(files[i], 'utf8');
        var samples = file.match(/new Sample[\s\S]+};/g)[0];
        var splittedSample = samples.split('new Sample');
        for (var j = 1; j < splittedSample.length; j++) {
            var commentedSample = splittedSample[j].match(/\/\/(.*)Url.*=.*"(.*)"/);
            var sampleUrl = splittedSample[j].match(/Url.*=.*"(.*)"/);
            var sampleType = splittedSample[j].match(/Type.*=.*SampleType.*/);
            if (commentedSample) {
                continue;
            } else {
                var urls = SITE_URL;
                if (process.argv[4] === 'local-sitemap' && sampleType && sampleType[0].indexOf('SampleType.New') !== -1) {
                    urls = LOCAL_SITE_URL;
                    urls = urls.replace(/{{:Type}}/g, 'new');
                }
                urls = urls.replace(/{{:DemoPath}}/g, path + (sampleUrl[0].replace(/Url.*=/, '').replace(/"/g, '')).trim().toLowerCase() + '/');
                urls = urls.replace(/{{:Date}}/g, date);
                combinedUrl += urls;
            }
        }
    }
    siteMapFile = siteMapFile.replace(/{{URLS}}/g, combinedUrl);
    if (process.argv[4] === 'local-sitemap') {
        fs.writeFileSync('./BlazorServerApp_NET9/wwwroot/sitemap-demos.xml', siteMapFile, 'UTF8');
    } else {
        fs.writeFileSync('./sitemap-demos.xml', siteMapFile, 'UTF8');
    }
    done();
});

gulp.task('generate-sitemap', function (done) {
    var siteMapFile = SITEMAP_TEMPLATE;
    const currentBranch = process.env.githubSourceBranch || process.env.BRANCH_NAME || shelljs.exec('git rev-parse --abbrev-ref HEAD', { silent: true }).stdout.trim();
    var isHotfix = currentBranch.startsWith('hotfix/');
	var isRelease = currentBranch.startsWith('release/');
	const buildName = process.argv.includes('--buildName') ? process.argv[process.argv.indexOf('--buildName') + 1] : '';
    const sdkMap = {
        pdfviewerSDK: 'pdfviewersdk',
        docxeditorSDK: 'docxeditorsdk',
        spreadsheeteditorSDK: 'spreadsheeteditorsdk'
    };
    const basePathMap = {
        pdfviewerSDK: 'pdf-viewer',
        docxeditorSDK: 'docx-editor',
        spreadsheeteditorSDK: 'spreadsheet-editor'
    };
    const sdkName = sdkMap[buildName];
	const pathSDK = basePathMap[buildName];
    var combinedUrl = ""; var path ="";var files;
    var date = new Date().toISOString().substring(0, 10);
    var isServer = process.argv[4] === "server";
    var isWasm = process.argv[4] === "wasm";    
    const result = {
        server: [],
        wasm: [],
        common: []
    };
    const handledSamples = [];
    const conditionalBlockPattern = /#if\s+([\s\S]*?)\n([\s\S]*?)#endif/g;
    const samplePattern = /new Sample\s*\{[\s\S]*?\}/g;
    if(isServer){
         path = `https://document.syncfusion.com/demos/${pathSDK}/blazor-server/`;
        files = fastGlob.sync('./Common/Pages/**/SampleList.cs', { ignore: ['./Common/Pages/SampleList.cs'], caseSensitiveMatch: false });
    }
    else if(isWasm){
        path = `https://document.syncfusion.com/demos/${pathSDK}/blazor-wasm/`;
        files = fastGlob.sync('./Common/Pages/**/SampleList.cs', { ignore: ['./Common/Pages/AISamples/**','./Common/Pages/SampleList.cs'], caseSensitiveMatch: false });
    }

    for (var i = 0; i < files.length; i++) {
        var file = fs.readFileSync(files[i], 'utf8');
        let match;
        while ((match = conditionalBlockPattern.exec(file)) !== null) {
            const condition = match[1].trim();
            const blockContent = match[2];

            // Extract samples within the block
            const blockSamples = [...blockContent.matchAll(samplePattern)].map(m => m[0]);

            // Categorize samples based on condition
            if ((condition === 'SERVER') || (condition === '!WASM') || (condition === '!(WASM)')) {
                result.server.push(...blockSamples);
            }
            if ((condition === 'WASM') || (condition ==='!SERVER') || (condition === '!(SERVER)')) {
                result.wasm.push(...blockSamples);
            }

            handledSamples.push(...blockSamples);
        }

        // Find unhandled samples
        const allSamples = [...file.matchAll(samplePattern)].map(m => m[0]);
        result.common = allSamples.filter(sample => !handledSamples.includes(sample));
        var samples;
        if(isServer){
            result.server = [...result.server, ...result.common];
            samples = result.server;
        }
        if(isWasm){
            result.wasm = [...result.wasm, ...result.common];
            samples = result.wasm;
        }
    }
        for (var j = 1; j < samples.length; j++) {
            var commentedSample = samples[j].match(/\/\/(.*)Url.*=.*"(.*)"/);
            var sampleUrl = samples[j].match(/Url.*=.*"(.*)"/);
            var sampleType = samples[j].match(/Type.*=.*SampleType.*/);
            if (commentedSample) {
                continue;
            } else {
                var urls = SITE_URL;
                if (process.argv[6] === 'local-sitemap' && sampleType && sampleType[0].indexOf('SampleType.New') !== -1) {
                    urls = LOCAL_SITE_URL;
                    urls = urls.replace(/{{:Type}}/g, 'new');
                }
                urls = urls.replace(/{{:DemoPath}}/g, path + (sampleUrl[0].replace(/Url.*=/, '').replace(/"/g, '')).trim().toLowerCase() + '/');
                urls = urls.replace(/{{:Date}}/g, date);
                combinedUrl += urls;
            }
        }
    siteMapFile = siteMapFile.replace(/{{URLS}}/g, combinedUrl);
    if (process.argv[6] === 'local-sitemap') {
        var filePath = isServer ? `./${sdkName}blazorserverapp10${isHotfix?'_hotfix':(isRelease ? '_release':'')}/wwwroot/sitemap-demos.xml` : `./${sdkName}blazorwasmapp10${isHotfix?'_hotfix':(isRelease ? '_release':'')}/wwwroot/sitemap-wasm-demos.xml`;
        fs.writeFileSync(filePath, siteMapFile, 'UTF8');
    } else {
        var filePath = isServer ? './sitemap-demos.xml' : './sitemap-wasm-demos.xml';
        fs.writeFileSync(filePath, siteMapFile, 'UTF8');
    }
    done();
});

var checkFileName = (fileName) => {
    return REGEX.test(fileName);
};

var getFilePath = (filePath) => {
    return filePath.split(ASSET_PATH)[1];
};

var generateReport = (done) => {
    logConsole(rootFolders, 'ROOT FOLDERS');
    logConsole(folders, 'FOLDER NAMES');
    logConsole(fileNames, 'FILE NAMES');
    logConsole(scriptFiles, 'SCRIPT FILES');
    logConsole(styleFiles, 'STYLE FILES');
    logConsole(imageFiles, 'IMAGE FILES');
    logConsole(dataFiles, 'DATA FILES');
    if (hasErrors) {
        console.log('\n\n\n******* Check the below guideline confluence to resolve this issues *******\n');
        console.log('https://syncfusion.sharepoint.com/sites/Blazor/SitePages/Blazor%20SB%20static%20assets%20standards.aspx\n');
        done();
        process.exit(1);
    } else {
        done();
    }
};

var logConsole = (fileReport, type) => {
    if (fileReport.length) {
        hasErrors = true;
        console.log(`\n!!! The below ${type} (${fileReport.length}) having static assets standard issues !!!\n`);
        fileReport.forEach((item) => {
            console.log(item);
        });
    }
};

gulp.task('server-build', () => {
    var target = process.argv[4];
    var buildName = process.argv[6];
    var projectName =  target === 'server-net8' ? ServerProjectPath_NET8 : target === 'server-net9' ? ServerProjectPath_NET9:ServerProjectPath_NET10;
    cleanProject();
    Clean(projectName);
    Restore(projectName, ServerNugetPath);
    return gulp.src([projectName], { read: false })
        .pipe(build({ configuration: 'Release', echo: true, msbuildArgs: ["/flp:Logfile=warnings.log;Verbosity=Minimal"] })
        );
});

gulp.task('wasm-build', () => {
    var target = process.argv[4];
    var buildName = process.argv[6];
    var projectName = target === 'wasm-net8' ? WasmProjectPath_NET8 : target === 'wasm-net9' ? WasmProjectPath_NET9: WasmProjectPath_NET10;
    cleanProject();
    Clean(projectName);
    Restore(projectName, WasmNugetPath);
    return gulp.src([projectName], { read: false })
        .pipe(build({ configuration: 'Release', echo: true, msbuildArgs: ["/flp:Verbosity=Minimal"] })
        );
});

function Clean(projectPath) {
    gulp.src([projectPath], { read: false }).pipe(clean());
}

function Restore(projectPath, nugetPath) {
    gulp.src([projectPath], { read: false }).pipe(restore({ configfile: nugetPath, echo: true, verbosity: 'Minimal' }));
}

gulp.task('publish', async function (done) {
    const sample = process.argv.includes('--sample') ? process.argv[process.argv.indexOf('--sample') + 1] : '';
    const buildName = process.argv.includes('--buildName') ? process.argv[process.argv.indexOf('--buildName') + 1] : '';

    const validBuildNames = ['documentSDK', 'docxeditorSDK', 'pdfviewerSDK', 'spreadsheeteditorSDK'];
    if (!validBuildNames.includes(buildName)) {
        console.error(`Invalid build name: ${buildName}`);
        done();
        return;
    }
	const sdkMap = {
        documentSDK: 'documentsdk',
        pdfviewerSDK: 'pdfviewersdk',
        docxeditorSDK: 'docxeditorsdk',
        spreadsheeteditorSDK: 'spreadsheeteditorsdk'
    };
	const basePathMap = {
        documentSDK: 'documentsdk',
        pdfviewerSDK: 'pdf-viewer',
        docxeditorSDK: 'docx-editor',
        spreadsheeteditorSDK: 'spreadsheet-editor'
    };
    let projectPath, outputPath;
    const sdkName = sdkMap[buildName];
	const basePathSDK = basePathMap[buildName];
    const projectType = sample.includes('server') ? 'blazorserver' : 'blazorwasm';
    const dotnetVersion = sample.includes('net9') ? '90' : (sample.includes('net10') ? '10' : '80');

    const currentBranch = process.env.githubSourceBranch || process.env.BRANCH_NAME || shelljs.exec('git rev-parse --abbrev-ref HEAD', { silent: true }).stdout.trim();
    const isHotfix = currentBranch.startsWith('hotfix/');
    const isRelease = currentBranch.startsWith('release/');
    var branch = isHotfix ? 'hotfix' : 'development';
	branch = isRelease ? 'release' : branch;

    let publishFolderName = `${sdkName}${projectType}app${dotnetVersion}`;
	publishFolderName = isHotfix ? publishFolderName+'_hotfix' : (isRelease ? publishFolderName+'_release' : publishFolderName);
    outputPath = publishFolderName;

    // Define project paths (ensure these are set correctly)
    const ServerProjectPath_NET8 = './Blazor-Server-Demos/Blazor_Server_Demos_NET8.csproj';
    const ServerProjectPath_NET9 = './Blazor-Server-Demos/Blazor_Server_Demos_NET9.csproj';
    const ServerProjectPath_NET10 = './Blazor-Server-Demos/Blazor_Server_Demos_NET10.csproj';
    const WasmProjectPath_NET8 = './Blazor-WASM-Demos/Blazor_WASM_Demos/Blazor_WASM_Demos_NET8.csproj';
    const WasmProjectPath_NET9 = './Blazor-WASM-Demos/Blazor_WASM_Demos/Blazor_WASM_Demos_NET9.csproj';
    const WasmProjectPath_NET10 = './Blazor-WASM-Demos/Blazor_WASM_Demos/Blazor_WASM_Demos_NET10.csproj';

    if (sample.includes('server-net8') || sample.includes('server-net9') || sample.includes('server-net10')) {
        projectPath = sample.includes('server-net8') ? ServerProjectPath_NET8 : (sample.includes('server-net9') ? ServerProjectPath_NET9 : ServerProjectPath_NET10);
        const pathToFolder = './Blazor-Server-Demos/Components/App.razor';
        const pathToProgramFile = './Blazor-Server-Demos/Program.cs';
        let basePath = sample.includes('net8') ? `/demos/${basePathSDK}/blazor-server/${branch}/net8/`: (sample.includes('net9') ? `/demos/${basePathSDK}/blazor-server/${branch}/net9/` : `/demos/${basePathSDK}/blazor-server/${branch}/net10/`);
        if (sample === 'cloudtesting-server-net8') basePath = '/cloudtesting/net8-server/';

        let index = fs.readFileSync(pathToFolder, 'utf8');
        const baseHref = `${basePath}`;
        index = index.replace(/<base href=".*?" \/>/, `<base href="${baseHref}" />`);
        fs.writeFileSync(pathToFolder, index);

        let programFile = fs.readFileSync(pathToProgramFile, 'utf8');
        const reDirect = `app.UseStatusCodePagesWithRedirects("${basePath}Error")`;
        programFile = programFile.replace(/app\.UseStatusCodePagesWithRedirects\(".*?"\)/, reDirect);
        fs.writeFileSync(pathToProgramFile, programFile);

        console.log(`Basepath Updated --> ${basePath}`);
    }

    if (sample.includes('wasm-net8') || sample.includes('wasm-net9') || sample.includes('wasm-net10')) {
        projectPath = sample.includes('wasm-net8') ? WasmProjectPath_NET8 : (sample.includes('wasm-net9') ? WasmProjectPath_NET9 : WasmProjectPath_NET10);
        const pathToFolder = './Blazor-WASM-Demos/Blazor_WASM_Demos/Components/App.razor';
        const basePath = sample.includes('wasm-net8') ? `/demos/${basePathSDK}/blazor-wasm/${branch}/net8/`: (sample.includes('wasm-net9') ? `/demos/${basePathSDK}/blazor-wasm/${branch}/net9/` : `/demos/${basePathSDK}/blazor-wasm/${branch}/net10/`);
        let index = fs.readFileSync(pathToFolder, 'utf8');
        const baseHref = `${basePath}`;
        index = index.replace(/<base href=".*?"\s*\/?\s*>/g, `<base href="${baseHref}" />`);
		fs.writeFileSync(pathToFolder, index);
        console.log(`Basepath Updated --> ${basePath}`);
    }

    if (!fs.existsSync(projectPath)) {
        console.error(`Project path does not exist: ${projectPath}`);
        done();
        return;
    }

    console.log(`Publishing project: ${projectPath}`);
    cleanProject();
    // projectPath = projectPath + ' -p:FeatureFlags=ISSTAGING';
    var staging = (/^(release\/)/g.test('release/') || /^(hotfix\/)/g.test(process.env.githubSourceBranch)) ? '' : '/p:STAGING=true';
    var trimCodeReference = sample === 'wasm-net8' || sample === 'wasm-net9' || sample === 'wasm-net10' || sample === 'cloudtesting-wasm-net8' ? '-p:PublishTrimmed=false' : '';
    var result = shelljs.exec(`dotnet publish "${projectPath}" ${staging} ${trimCodeReference} /p:ISSTAGING=true -c Release --self-contained true -r win-x64 -o ${outputPath}`);
    if (result.code !== 0) {
        console.error(`Result Code: ${result.code}`);
        done();
        process.exit(1);
    }
	else{
		if (sample.indexOf('server-') !== -1) {
			var pathToWebconfig = `${outputPath}/web.config`;
			var webConfig = fs.readFileSync(pathToWebconfig, 'utf8');
			webConfig = webConfig.replace('modules="AspNetCoreModuleV2"', 'modules="AspNetCoreModule"');
			fs.writeFileSync(pathToWebconfig, webConfig);
			console.log("WebConfig Updated --> " + pathToWebconfig);
		}
	}
    if (sample.indexOf('wasm-') !== -1) {
        var pathToWebconfig = `${outputPath}/web.config`;
        var webConfig = fs.readFileSync(pathToWebconfig, 'utf8');
        webConfig = webConfig.replace('modules="AspNetCoreModuleV2"', 'modules="AspNetCoreModule"');
        fs.writeFileSync(pathToWebconfig, webConfig);
        console.log(`WebConfig Updated --> ${pathToWebconfig}`);
    }

    zipFolder('./' + outputPath, './' + outputPath + '.zip', function (err) {
        if (err) {
            console.error(`Error while zipping: ${err}`);
        } else {
			if(!outputPath.includes(`${sdkName}${projectType}app10${isHotfixBranch?'_hotfix':(isReleaseBranch ? '_release':'')}`))
				shelljs.rm('-rf', outputPath);
            console.log(`Zipped folder created: ${outputPath}.zip`);
        }
    });
    done();
});

var cleanProject = () => {
    var files = glob.sync('**/{bin,obj}/', { ignore: 'node_modules/**' });
    shelljs.rm('-rf', files);
};

gulp.task('code-leaks-analysis', function (done) {
    var codeLeaksReport = JSON.parse(fs.readFileSync('GitLeaksReport.json', 'utf-8'));
    if (Object(codeLeaksReport).length <= 0) {
        console.log("<- No Leaks Found ->");
        shelljs.exec('rm GitLeaksReport.json')
    }
    else {
        throw "Please clear the Git Leaks reported issues";
    }
    done();
});
