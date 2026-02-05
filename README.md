# Syncfusion® Blazor Docx Editor SDK Demos 
This repository contains the demos of Syncfusion® Blazor [**Docx Editor**](https://document.syncfusion.com/demos/docx-editor/blazor-server/document-editor/default-functionalities) Component samples.
The following topics can help you to use the Syncfusion Blazor Docx Editor and run this application in your local. 
* [Requirements to run the demo](#requirements-to-run-the-demo)
* [How to run the demo](#how-to-run-the-demo)
* [Docx Editor Components Catalog](#Word-viewer-components-catalog)
* [License](#license)
* [Support and feedback](#support-and-feedback)
## Requirements to run the demo
* [System requirements](https://help.syncfusion.com/document-processing/system-requirements)
* [NET 8 WebAssembly Workload / NET 9 WebAssembly Workload](https://learn.microsoft.com/en-us/aspnet/core/blazor/webassembly-build-tools-and-aot?view=aspnetcore-8.0#net-webassembly-build-tools) (For [Docx Editor Component](https://help.syncfusion.com/document-processing/word/word-processor/blazor/getting-started/server-side-application))
* Nodejs Version : [10.24.* or above](https://nodejs.org/download/release/v8.1.0/)
## How to run the demo
Clone the repository. This repository contains Blazor Server demos and Blazor WASM demos project and solution files for .NET 8 and .NET 9. This repository has Common, Blazor Server Demos, and Blazor WASM Demos folders.
* `Blazor-Server-Demos` folder has solution and project files to run Blazor server demos.
* `Blazor-WASM-Demos` folder has solution and project files to run Blazor WebAssembly demos.
* The Common folder contains all the common files (i.e., samples, static web assets, resources) which are applicable for both Blazor Server demos and Blazor WASM demos.
### Run the demo using .NET CLI
* Open the command prompt from the demo's directory.
* Run the demo using the following command.
   
   To run .NET 8 Blazor Server Demos project
   > `dotnet run --project Blazor-Server-Demos/Blazor_Server_Demos_NET8.csproj`
   To run .NET 9 Blazor Server Demos project
   > `dotnet run --project Blazor-Server-Demos/Blazor_Server_Demos_NET9.csproj`
   To run .NET 8 Blazor WASM Demos project
   > `dotnet run --project Blazor-WASM-Demos/Blazor_WASM_Demos_NET8.csproj`
   To run .NET 9 Blazor WASM Demos project
   > `dotnet run --project Blazor-WASM-Demos/Blazor_WASM_Demos_NET9.csproj`
### Run the demo using Visual Studio
* Open the solution file using Visual Studio.
* Press `Ctrl + F5` to run the demo.
### Run the demo using Visual Studio code
* Open the Visual Studio code from the demos directory where the project file is present.
    > Ensure the [C# for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp) extension is installed in your Visual Studio code before running the Blazor demos.
* Press `Ctrl + F5` to run the demo.
## Docx Editor Components Catalog
This repository focuses on Docx Editor components with comprehensive examples showcasing various features and functionalities.
### Docx Editor Component
The **Syncfusion® Blazor Docx Editor** component allows you to view, review, edit and print Word files in web applications. It provides a rich set of features for working with Word documents.
**Key Features:**

* [Document Authoring](https://document.syncfusion.com/demos/docx-editor/blazor-server/document-editor/default-functionalities) -  Allows to create a document with supported elements and formatting options.
  * Supported elements - Supports document elements like text, inline image, table, hyperlink, fields, bookmark, table of contents, footnote and endnote, section, header, and footer.
  * Styles - Supports character and paragraph styles.
  * Editing - Supports all the common editing and formatting operations.
  * History - Supports options to perform undo redo operations.
  * Find and replace - Provides support to find and replace text within the document.
  * [Track changes](https://document.syncfusion.com/demos/docx-editor/blazor-server/document-editor/track-changes) - Suppports tracking the content insertion and deletion.
  * [Commenting](https://document.syncfusion.com/demos/docx-editor/blazor-server/document-editor/comments) - Supports adding a comment, replying to an existing comment or mark as resolved and more.
  * [Form filling](https://document.syncfusion.com/demos/docx-editor/blazor-server/document-editor/form-fields) - Supports designing fillable forms in Word document and fill the forms.
  * [Restrict editng](https://document.syncfusion.com/demos/docx-editor/blazor-server/document-editor/document-protection) - Supports restricting edit permission for a region in Word document and control what type of changes can be made to the document.
* Export - Provides the options to export the documents in the client-side as `Syncfusion Document Text (*.sfdt)` and `Word document (*.docx)`. With server-side library, exporting as other formats can be achieved.
* Import - Provides the options to import the native `Syncfusion Document Text (*.sfdt)` format documents in the client-side. With server-side library, importing other formats can be achieved.
* Print - Provides the options to print the documents.
* Clipboard - Provides support to cut, copy, and paste rich text contents within the component. Also allows pasting simple text from other applications. Paste rich text from other applications using server-side library.
* User interface - Provides intuitive user friendly interface to perform various operations.
  * Context menu - Provides context menu.
  * Dialog - Provides dialog for inserting elements such as hyperlink, table and formatting such as font, paragraph, list, style, table.
  * Options pane - Provides options pane to perform find and replace operations.

  **Documentation:** [Docx Editor Documentation](https://help.syncfusion.com/document-processing/word/word-processor/blazor/getting-started/server-side-application)
---
### Smart AI Assist
The **Syncfusion® Blazor Docx Editor** integrates AI capabilities to enhance content creation. Users can generate new content from prompts, refine existing content, and produce summaries or Q&A responses based on the document.
**Key Smart Features:**
- **Rephrase:** Enhance clarity and tone with AI-powered sentence rephrasing.
- **Translate:** Automatically complete form fields using intelligent language translation.
- **Grammar:** Detect and redact sensitive content with AI-driven grammar analysis.
- **Summarization and Q&A:** Summarize documents and answer questions while ensuring sensitive content is redacted.


#### 🔗 **View Live Demo**  [Docx Editor with Smart AI Assist](https://document.syncfusion.com/demos/docx-editor/blazor-server/ai-documenteditor/smart-ai-assist)
---

## Getting Started
### Docx Editor
To get started with the Docx Editor component:
1. Install the Syncfusion.Blazor.DocumentEditor NuGet package
2. Configure the Document Editor in your application
3. Add the Document Editor component to your Blazor page
```csharp
@page "/document-editor"
@using Syncfusion.Blazor.DocumentEditor;
<SfDocumentEditorContainer @ref="@containerRef" 
              RestrictEditing="@ReadOnly"
              ShowPropertiesPane="@ShowProperties"
              Height="100%" Width="100%">
</SfDocumentEditorContainer>
```
## License
Syncfusion Blazor Components is available under the Syncfusion Essential Studio program, and can be licensed either under the Syncfusion Community License Program or the Syncfusion commercial license.
To be qualified for the Syncfusion Community License Program, you must have gross revenue of less than one (1) million U.S. dollars (USD 1,000,000.00) per year and have less than five (5) developers in your organization, and agree to be bound by Syncfusion's terms and conditions.
Customers who do not qualify for the community license can contact sales@syncfusion.com for commercial licensing options.
You may not use this product without first purchasing a Community License or a Commercial License, as well as agreeing to and complying with Syncfusion's license terms and conditions.
The Syncfusion license that contains the terms and conditions can be found at
[https://www.syncfusion.com/content/downloads/syncfusion_license.Word](https://www.syncfusion.com/content/downloads/syncfusion_license.Word)
## Support and feedback
* For any other queries, reach the [Syncfusion support team](https://support.syncfusion.com/) or post the queries through the [community forums](https://www.syncfusion.com/forums?utm_source=github&utm_medium=listing&utm_campaign=blazor-samples).
* To renew the subscription, click [here](https://www.syncfusion.com/sales/products?utm_source=github&utm_medium=listing&utm_campaign=blazor-Wordviewer-samples) or contact our sales team at <salessupport@syncfusion.com>.
* Don't see what you need? Please request it in our [feedback portal](https://www.syncfusion.com/feedback/blazor-components).
## See also
* [Blazor Docx Editor Documentation](https://help.syncfusion.com/document-processing/word/word-processor/blazor/getting-started)
* [Blazor Docx Editor Live Demos](https://document.syncfusion.com/demos/docx-editor/blazor-server/document-editor/default-functionalities)
* [Blazor Smart Docx Editor Live Demos](https://document.syncfusion.com/demos/docx-editor/blazor-server/ai-documenteditor/smart-ai-assist)
* [Syncfusion Blazor Components](https://www.syncfusion.com/blazor-components)
* [Blazor Documentation](https://blazor.syncfusion.com/documentation/introduction)
* [Blazor Smart/AI Samples](https://github.com/syncfusion/smart-ai-samples)