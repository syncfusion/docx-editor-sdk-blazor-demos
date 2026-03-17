#region Copyright Syncfusion Inc. 2001-2023.
// Copyright Syncfusion Inc. 2001-2023. All rights reserved.
// Use of this code is subject to the terms of our license.
// A copy of the current license can be obtained at any time by e-mailing
// licensing@syncfusion.com. Any infringement will be prosecuted under
// applicable laws. 
#endregion
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlazorDemos
{

    internal partial class SampleConfig
    {
        public List<Sample> DocumentEditor { get; set; } = new List<Sample>{
            new Sample
            {
                Name = "Default Functionalities",
                Category = "DocumentEditor",
                Directory = "DocumentEditor/DocumentEditor",
                MetaTitle = "Word Processor Default Functionalities - Syncfusion Demos",
                HeaderText = "Blazor Document Editor Example - Default Functionalities",
                MetaDescription = "Blazor Document Editor demo shows key word processing features. It allows editing text, formatting content, and managing document layout in Blazor application.",
                Url = "document-editor/default-functionalities",
                FileName = "DefaultFunctionalities.razor",
            },
#if SERVER
            new Sample
            {
                Name = "Document List",
                Category = "File Management",  
                Directory = "DocumentEditor/DocumentEditor",
                MetaTitle = "Blazor Document Editor Document List | File Management | Syncfusion",
                HeaderText = "Blazor Document Editor Example - Document List Management",
                MetaDescription = "This Blazor Document Editor example shows how to organize and manage multiple documents with thumbnails, file navigation, and document selection capabilities.",
                Url = "document-editor/document-list",
                FileName = "DocumentList.razor"
            },
#endif
            new Sample
            {
                 Name = "Mail Merge",
                 Category = "Mail Merge",
                 Directory = "DocumentEditor/DocumentEditor",
                 MetaTitle = "Blazor Document Editor Mail Merge | Data Integration | Syncfusion",
                 HeaderText = "Blazor Document Editor Example - Mail Merge Functionality",
                 MetaDescription = "Blazor Document Editor mail merge demo shows how to generate personalized documents by combining a template with data records for automated document generation.",
                 Url = "document-editor/mail-merge",
                 FileName = "MailMerge.razor"
             },
             new Sample
            {
                Name = "Comments",
                Category = "Review",
                Directory = "DocumentEditor/DocumentEditor",
                MetaTitle = "Blazor Document Editor Comments | Collaborative Editing | Syncfusion",
                HeaderText = "Blazor Document Editor Example - Document Comments",
                MetaDescription = "Blazor Document Editor comments demo shows collaborative document review with the ability to add, edit, reply to, and resolve comments within your documents.",
                Url = "document-editor/comments",
                FileName = "Comments.razor"
            },
            new Sample
            {
                Name = "Track Changes",
                Category = "Review",
                Directory = "DocumentEditor/DocumentEditor",
                MetaTitle = "Blazor Document Editor Track Changes | Revision Tracking | Syncfusion",
                HeaderText = "Blazor Document Editor Example - Track Changes",
                MetaDescription = "This Blazor Document Editor track changes demo shows revision tracking functionality allowing users to record, review, accept, or reject document modifications.",
                Url = "document-editor/track-changes",
                FileName = "TrackChanges.razor"
            },
            new Sample
            {
                Name = "Document Protection",
                Category = "Security",
                Directory = "DocumentEditor/DocumentEditor",
                MetaTitle = "Blazor Document Editor Protection | Document Security | Syncfusion",
                HeaderText = "Blazor Document Editor Example - Document Protection",
                MetaDescription = "Blazor Document Editor protection demo shows how to secure documents with password protection and permission controls to restrict editing to specific sections.",
                Url = "document-editor/document-protection",
                FileName = "DocumentProtection.razor"
            },
            new Sample
            {
                Name = "Custom Context Menu",
                Category = "Customization",
                Directory = "DocumentEditor/DocumentEditor",
                MetaTitle = "Blazor Document Editor Custom Context Menu | Syncfusion",
                HeaderText = "Blazor Document Editor Example - Custom Context Menu",
                MetaDescription = "This Blazor Document Editor example shows how to implement and customize context menus to enhance the editing experience with tailored right-click options.",
                Url = "document-editor/custom-context-menu",
                FileName = "CustomContextMenu.razor"
            },
             new Sample
            {
                Name = "Toolbar Customization",
                Category = "Customization",
                Directory = "DocumentEditor/DocumentEditor",
                MetaTitle = "Blazor Document Editor Toolbar Customization | UI Control | Syncfusion",
                HeaderText = "Blazor Document Editor Example - Toolbar Customization",
                MetaDescription = "This Blazor Document Editor toolbar customization demo shows how to personalize the editor toolbar by adding, removing, or commands for an optimized workflow.",
                Url = "document-editor/toolbar-customization",
                FileName = "ToolbarCustomization.razor"
            },
            new Sample
            {
                Name = "Color Picker Customization",
                Category = "Customization",
                Directory = "DocumentEditor/DocumentEditor",
                Url = "document-editor/color-picker-customization",
                MetaTitle = "WordProcessor Color Picker Customization - Syncfusion Demos",
                HeaderText = "Blazor Document Editor Example - Color Picker Customization",
                MetaDescription = "This Blazor Document Editor demo shows how to customize the color picker component with different layouts, custom palettes, and color selection options.",
                FileName = "ColorPickerCustomization.razor"                
            },
            
            new Sample
            {
                Name = "Table of Contents",
                Category = "References",
                Directory = "DocumentEditor/DocumentEditor",
                MetaTitle = "Blazor Document Editor Table of Contents | Reference Tool | Syncfusion",
                HeaderText = "Blazor Document Editor Example - Table of Contents Generation",
                MetaDescription = "Blazor Document Editor demo shows how to generate, update, format a table of contents that automatically reflects the document's structure with custom styles.",
                Url = "document-editor/table-of-contents",
                FileName = "TableOfContents.razor"
            },
            new Sample
            {
                Name = "Footnotes and Endnotes",
                Category = "References",
                Directory = "DocumentEditor/DocumentEditor",
                Url = "document-editor/notes",
                MetaTitle = "Word Processor Footnotes and Endnotes - Syncfusion Demos",
                HeaderText = "Blazor Document Editor Example - Footnotes and Endnotes",
                MetaDescription = "This Blazor Document Editor example shows how to add, edit, and format footnotes and endnotes with automatic numbering to provide supplementary information.",
                FileName = "Notes.razor"
            },
            new Sample
            {
                Name = "Auto Shapes",
                Category = "Shapes",
                Directory = "DocumentEditor/DocumentEditor",
                MetaTitle = "Blazor Document Editor Auto Shapes | Drawing Tools | Syncfusion",
                HeaderText = "Blazor Document Editor Example - Auto Shapes Integration",
                MetaDescription = "This Blazor Document Editor auto shapes example demonstrates how to insert, customize, and manipulate various shapes, and arrows with style formatting.",
                Url = "document-editor/autoshapes",
                FileName = "AutoShapes.razor"
            },
            new Sample
            {
                Name = "Web Layout",
                Category = "View",
                Directory = "DocumentEditor/DocumentEditor",
                MetaTitle = "Blazor Document Editor Web Layout | Layout View | Syncfusion",
                HeaderText = "Blazor Document Editor Example - Web Layout View",
                MetaDescription = "This Blazor Document Editor web layout example shows how to display documents in a continuous view optimized for web reading, removing page boundaries.",
                Url = "document-editor/web-layout",
                FileName = "WebLayout.razor"
            },
            new Sample
            {
                Name = "Ruler",
                Category = "View",
                Directory = "DocumentEditor/DocumentEditor",
                MetaTitle = "Blazor Document Editor Ruler | Page Layout Tools | Syncfusion",
                HeaderText = "Blazor Document Editor Example - Ruler and Measurement Tools",
                MetaDescription = "This Blazor Document Editor ruler demo shows how to use horizontal and vertical rulers for precise measurement and positioning of elements within your document.",
                Url = "document-editor/ruler",
                FileName = "Ruler.razor"
            },
            new Sample
            {
                Name = "Heading Navigation",
                Category = "View",
                Directory = "DocumentEditor/DocumentEditor",
                MetaTitle = "Blazor Document Editor Heading Navigation | Outline | Syncfusion",
                HeaderText = "Blazor Document Editor Example - Heading Navigation Pane",
                MetaDescription = "Blazor Document Editor heading navigation demo shows how to navigate through document headings with an interactive outline view for efficient document browsing.",
                Url = "document-editor/heading-navigation",
                FileName = "HeadingNavigationPane.razor"                
            },
            new Sample
            {
                Name = "Character Formatting",
                Category = "Editing Features",
                Directory = "DocumentEditor/DocumentEditor",
                MetaTitle = "Blazor Document Editor Character Formatting | Text Style | Syncfusion",
                HeaderText = "Blazor Document Editor Example - Character Formatting",
                MetaDescription = "Blazor Document Editor character format demo shows how to apply font styles, colors, highlights, and text effects to enhance the appearance of document content.",
                Url = "document-editor/character-format",
                FileName = "CharacterFormat.razor"
            },
            new Sample
            {
                Name = "Paragraph Formatting",
                Category = "Editing Features",
                Directory = "DocumentEditor/DocumentEditor",
                MetaTitle = "Blazor Document Editor Paragraph Formatting | Text Layout | Syncfusion",
                HeaderText = "Blazor Document Editor Example - Paragraph Formatting",
                MetaDescription = "This Blazor Document Editor paragraph formatting demo shows how to adjust alignment, spacing, indentation, line spacing for improved document readability.",
                Url = "document-editor/paragraph-format",
                FileName = "ParagraphFormat.razor"
            },
            new Sample
            {
                Name = "Styles",
                Category = "Editing Features",
                Directory = "DocumentEditor/DocumentEditor",
                MetaTitle = "Blazor Document Editor Styles | Formatting Templates | Syncfusion",
                HeaderText = "Blazor Document Editor Example - Document Styles",
                MetaDescription = "This Blazor Document Editor styles example demonstrates how to create, apply, and modify document styles for consistent formatting across headings, paragraphs.",
                Url = "document-editor/styles",
                FileName = "Styles.razor"
            },
            new Sample
            {
                Name = "Bullets and Numbering",
                Category = "Editing Features",
                Directory = "DocumentEditor/DocumentEditor",
                MetaTitle = "Blazor Document Editor Bullets and Numbering | Formatting | Syncfusion",
                HeaderText = "Blazor Document Editor Example - Bullets and Numbering",
                MetaDescription = "Blazor Document Editor bullets and numbering demo shows how to create and format ordered and unordered lists with various bullet styles and numbering formats.",
                Url = "document-editor/bullets-and-numbering",
                FileName = "BulletsAndNumbering.razor"
            },
            new Sample
            {
                Name = "Hyperlinks and Bookmarks",
                Category = "Editing Features",
                Directory = "DocumentEditor/DocumentEditor",
                Url = "document-editor/hyperlinks-and-bookmarks",
                MetaTitle = "Word Processor Hyperlinks and Bookmarks - Syncfusion Demos",
                HeaderText = "Blazor Document Editor Example - Hyperlinks and Bookmarks",
                MetaDescription = "This Blazor Document Editor demo shows how to insert and manage hyperlinks to URLs and email addresses, as well as create internal navigation with bookmarks.",
                FileName = "HyperlinksAndBookmarks.razor"
            },
            new Sample
            {
                Name = "Table Formatting",
                Category = "Editing Features",
                Directory = "DocumentEditor/DocumentEditor",
                MetaTitle = "Blazor Document Editor Table Formatting | Table Design | Syncfusion",
                HeaderText = "Blazor Document Editor Example - Table Formatting",
                MetaDescription = "This Blazor Document Editor table formatting demo shows how to create, modify, and style tables with borders, shading, cell spacing, and merged cells.",
                Url = "document-editor/table-format",
                FileName = "TableFormat.razor"
            },
            new Sample
            {
                Name = "Section Formatting",
                Category = "Editing Features",
                Directory = "DocumentEditor/DocumentEditor",
                MetaTitle = "Blazor Document Editor Section Formatting | Layout | Syncfusion",
                HeaderText = "Blazor Document Editor Example - Section Formatting",
                MetaDescription = "Blazor Document Editor formatting demo shows how to create and format document sections with different page size, orientation, margin within a single document.",
                Url = "document-editor/section-format",
                FileName = "SectionFormat.razor"
            },
            new Sample
            {
                Name = "Headers and Footers",
                Category = "Editing Features",
                Directory = "DocumentEditor/DocumentEditor",
                MetaTitle = "Blazor Document Editor Headers and Footers | Page Element | Syncfusion",
                HeaderText = "Blazor Document Editor Example - Headers and Footers",
                MetaDescription = "Blazor Document Editor header and footer demo shows how to customize page headers and footers with text, images, page numbers, and different first page options.",
                Url = "document-editor/headers-and-footers",
                FileName = "HeadersAndFooters.razor"
            },
            
              new Sample
            {
                Name = "Form Fields",
                Category = "Editing Features",
                Directory = "DocumentEditor/DocumentEditor",
                MetaTitle = "Blazor Document Editor Form Fields | Interactive Forms | Syncfusion",
                HeaderText = "Blazor Document Editor Example - Form Fields Integration",
                MetaDescription = "Blazor Document Editor form fields demo shows how to create interactive forms with text fields, checkboxes, dropdown lists for data collection and form filling.",
                Url = "document-editor/form-fields",
                FileName = "FormFields.razor"
            },
             new Sample
            {
                Name = "Multiple Columns",
                Category = "Editing Features",
                Directory = "DocumentEditor/DocumentEditor",
                MetaTitle = "Blazor Document Editor Multiple Columns | Text Layout | Syncfusion",
                HeaderText = "Blazor Document Editor Example - Multiple Column Layout",
                MetaDescription = "Blazor Document Editor multiple columns demo shows how to create and format newspaper-style column layouts with customizable column width and spacing options.",
                Url = "document-editor/multiple-columns",
                FileName = "MultipleColumn.razor"
            },
             
             new Sample
            {
                Name = "Chart Preservation",
                Category = "Chart",
                Directory = "DocumentEditor/DocumentEditor",
                MetaTitle = "Blazor Document Editor Chart Preservation | Visualization | Syncfusion",
                HeaderText = "Blazor Document Editor Example - Chart Preservation",
                MetaDescription = "Blazor Document Editor chart preservation demo shows how to maintain and display various chart types including bar, pie, and line charts in imported documents.",
                Url = "document-editor/chart",
                FileName = "Chart.razor"
            },
            
        };
    }

}
