namespace BlazorDemos
{
    internal partial class SampleConfig
    {
        internal SampleConfig()
        {
            SampleBrowser.SampleList.Add(new SampleList
            {
                Name = "Docx Editor",
                Category = "Editor",
                Directory = "DocumentEditor/DocumentEditor",
                Samples = DocumentEditor,
                ControllerName = "DocumentEditor",
                CustomDocLink = "word-processor/blazor/overview",
                DemoPath = "document-editor/default-functionalities",
            });
#if SERVER
            SampleBrowser.SampleList.Add(new SampleList
            {
                Name = "Docx Editor",
                Category = "Smart AI Solutions",
                Directory = "AISamples",
                Samples = AIDocumentEditor,
                ControllerName = "AIDocumentEditor",
                DemoPath = "ai-documenteditor/smart-ai-assist",
                CustomDocLink = "word-processor/blazor/overview",
            });
#endif

        }
    }
}
