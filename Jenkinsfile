#!groovy
properties([
    pipelineTriggers([
        cron('0 17 * * 4'), 
        cron('0 9 * * 2')  
    ])
])
node('BlazorComponentsNET10') {
    timeout(time:180){
        try {
            deleteDir();
            stage('Import') {
                git url: 'https://gitea.syncfusion.com/essential-studio/ej2-groovy-scripts.git', branch: 'master', credentialsId: env.GiteaCredentialID;
                blazor = load 'src/blazor.groovy';
            }

            stage('Checkout') {
                checkout([$class: 'GitSCM', branches: [[name: '*/$githubSourceBranch']], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: ''],[$class: 'CloneOption', noTags: true, shallow: true, depth: 1, timeout: 30]], submoduleCfg: [], userRemoteConfigs: [[credentialsId: env.GiteaCredentialID, url: 'https://gitea.syncfusion.com/essential-studio/blazor-word-editor-samples.git']]])
            }

            stage('Workflow Validation') {
                blazor.getProjectDetails();
                blazor.githubCommitStatus('running');
                blazor.validateMRDescription();
            }

            if(blazor.checkCommitMessage()) {
                stage('Install') {
                    blazor.install();
                    blazor.runShell('dotnet workload install wasm-tools');
                    blazor.runShell('dotnet workload install wasm-tools-net9');
                    blazor.runShell('dotnet workload install wasm-tools-net8');
                    blazor.runShell('dotnet workload list');
                }

                stage('Code Leaks Analysis'){
                    try{
                        blazor.initGitleaks();
                        blazor.runShell('npm run gitleaks-test')
                    }
                    finally{
                        if(fileExists('GitLeaksReport.json'))
                        {
                            archiveArtifacts artifacts:'GitLeaksReport.json';
                        }
                    }               
                }

                stage('Build') {
                    blazor.runShell('gulp update-nuget-config');
                    blazor.runShell('npm run build-docxeditorSDK-net10');
                    blazor.runShell('npm run build-docxeditorSDK-net9');
                    blazor.runShell('npm run build-docxeditorSDK-net8');                    
                }

                stage('Accessibility-Test') {
                try{
                    if(blazor.isProtectedBranch()) {
                        //Please uncomment the below line to get the accessibilty report
                        // blazor.runShell('npm run run-accessibility');
                    }
                }
                finally{
                    if(fileExists('AxeReport'))
                    {
                        archiveArtifacts artifacts: 'AxeReport/', excludes: null;
                    }
                }
            }

                stage('Publish') {
                    if(blazor.isProtectedBranch()) {
                        blazor.runShell('npm run update-service-urls');
                        blazor.runShell('npm run publish-docxeditorSDK-net9');
                        blazor.runShell('npm run publish-docxeditorSDK-net8');
                        blazor.runShell('npm run publish-docxeditorSDK-net10');
                    }
                }

                stage('Deploy') {
                    if(blazor.isProtectedBranch()) {
                        //blazor.runShell('gulp generate-sitemap --option server --option local-sitemap --buildName docxeditorSDK');
                        //blazor.runShell('gulp generate-sitemap --option wasm --option local-sitemap --buildName docxeditorSDK');
                        blazor.runShell('npm run blazor-deploy-docxeditorSDK'); 
                        //blazor.runShell('npm run blazor-cloudtest-deploy');
                        //Please uncomment the below line to deploy the accessibilty report
                        //blazor.runShell('npm run blazor-axecore-deploy');
                    }
                }
            } else {
                println('MESSAGE: [ci skip] TAG ADDED IN MR.');
            }
            blazor.githubCommitStatus('success');
            deleteDir();
        }

        catch(Exception e) {
            if (blazor.isProtectedBranch()) {
                blazor.runShell('gulp publish-report --platform Blazor');
            }
            deleteDir();
            error(e);
        }
    }
}

def isProtectedBranch() {
    return env.githubSourceBranch == env.STAGING_BRANCH || String.valueOf(env.githubSourceBranch).startsWith('hotfix/') || String.valueOf(env.githubSourceBranch).startsWith('release/');
}
