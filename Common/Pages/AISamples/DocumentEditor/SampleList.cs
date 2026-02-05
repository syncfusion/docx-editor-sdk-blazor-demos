#region Copyright Syncfusion® Inc. 2001-2026.
// Copyright Syncfusion® Inc. 2001-2026. All rights reserved.
// Use of this code is subject to the terms of our license.
// A copy of the current license can be obtained at any time by e-mailing
// licensing@syncfusion.com. Any infringement will be prosecuted under
// applicable laws. 
#endregion
using System.Collections.Generic;

namespace BlazorDemos
{
    internal partial class SampleConfig
    {
        public List<Sample> AIDocumentEditor { get; set; } = new List<Sample>{

            new Sample
            {
                Name = "Smart AI Assist",
                Category = "Document Editor",
                Directory = "AISamples/DocumentEditor",
                Url = "ai-documenteditor/smart-ai-assist",
                FileName = "SmartAIAssist.razor",
                MetaTitle = "Blazor Word Processor Smart AI Assist - Syncfusion AI Demos",
                HeaderText = "Blazor Document Editor Example - AI-Powered Smart Assistant",
                MetaDescription = "Blazor Document Editor AI offers real-time writing suggestions, formatting help, and summaries to enhance clarity, style, and content efficiency.",
                NotificationDescription = new string[]{ @" This demo shows the smart AI feature in document editor component." }
            }
        };
    }
}