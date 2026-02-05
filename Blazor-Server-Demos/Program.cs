#region Copyright Syncfusion® Inc. 2001-2026.
// Copyright Syncfusion® Inc. 2001-2026. All rights reserved.
// Use of this code is subject to the terms of our license.
// A copy of the current license can be obtained at any time by e-mailing
// licensing@syncfusion.com. Any infringement will be prosecuted under
// applicable laws. 
#endregion
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using BlazorDemos.Components;
using BlazorDemos.Shared;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Syncfusion.Blazor.Popups;
using Syncfusion.Blazor;
using SmartComponents.LocalEmbeddings;
using Syncfusion.Blazor.SmartComponents;
using BlazorDemos.Service;
using FileManagerAI.Services;
using Microsoft.AspNetCore.Http;
using Syncfusion.Licensing;
using System;
using System.Net.Http;
using Microsoft.AspNetCore.Components;
using Syncfusion.Blazor.AI;
using Microsoft.Extensions.AI;
using OpenAI;

var licenseKey = "";
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped(sp =>
{
    NavigationManager UriHelper = sp.GetRequiredService<NavigationManager>();
    return new HttpClient { BaseAddress = new Uri(UriHelper.BaseUri) };
});
// Add services to the container.
builder.Services.AddRazorComponents()
.AddInteractiveServerComponents();
builder.Services.AddRazorPages();
SyncfusionLicenseProvider.RegisterLicense(licenseKey);
#region AI Integration
// Local Embeddings
builder.Services.AddSingleton<LocalEmbedder>();
// Smart Components
#region AI services
/* OpenAI Service */
string apiKey = "your api key";
string deploymentName = "your deployment name";
OpenAIClient openAIClient = new OpenAIClient(apiKey);
IChatClient openAiChatClient = openAIClient.GetChatClient(deploymentName).AsIChatClient();
builder.Services.AddChatClient(openAiChatClient);
builder.Services.AddScoped<UserTokenService>();
builder.Services.AddScoped<CustomAIService>();
builder.Services.AddScoped<IChatInferenceService, CustomAIService>(sp =>
{
    UserTokenService userTokenService = sp.GetRequiredService<UserTokenService>();
    return new CustomAIService(userTokenService, openAiChatClient);
});

#endregion
builder.Services.AddControllers();
builder.Services.AddServerSideBlazor();
builder.Services.AddScoped<SfDialogService>();
builder.Services.AddScoped<SampleService>();
builder.Services.AddSingleton<DeviceMode>();
builder.Services.AddMemoryCache();
builder.Services.Configure<CookiePolicyOptions>(options =>
{
    options.MinimumSameSitePolicy = SameSiteMode.Strict;
});

#region Localization
// Set the resx file folder path to access
            builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");
            builder.Services.AddSyncfusionBlazor();
            // Register the Syncfusion locale service to customize the  SyncfusionBlazor component locale culture
            builder.Services.AddSingleton(typeof(ISyncfusionStringLocalizer), typeof(SyncfusionLocalizer));

            var supportedCultures = new[] { "en-US", "de-DE", "fr-CH", "zh-CN" };
            var localizationOptions = new RequestLocalizationOptions()
                        .SetDefaultCulture("en-US")
                        .AddSupportedCultures(supportedCultures)
                        .AddSupportedUICultures(supportedCultures);
    #endregion
        builder.Services.AddServerSideBlazor().AddCircuitOptions(option => { option.DetailedErrors = true; });
        builder.Services.AddSignalR(o => { o.MaximumReceiveMessageSize = 102400000; });

    // Set HSTS value is 1 year. see https://aka.ms/aspnetcore-hsts.
    builder.Services.AddHsts(options =>
    {
        options.IncludeSubDomains = true;
        options.MaxAge = TimeSpan.FromDays(730);
    });

        var app = builder.Build();
    #region Localization
        app.UseRequestLocalization(localizationOptions);
    #endregion

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
    {
        app.UseExceptionHandler("/Error");
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
    }
    app.UseStatusCodePagesWithRedirects("/Error");
    app.UseHttpsRedirection();
    app.UseCookiePolicy(
    new CookiePolicyOptions
    {
        Secure = CookieSecurePolicy.Always
    });
    app.UseDefaultFiles();
#if NET9_0_OR_GREATER
    app.MapStaticAssets();
#else
    app.UseStaticFiles();
#endif
    app.UseRouting();
    app.UseAntiforgery();
    app.MapRazorComponents<App>()
    .AddAdditionalAssemblies(typeof(BlazorDemos.Pages.Index).Assembly)
    .AddInteractiveServerRenderMode();
app.MapControllers();
app.Run();
#endregion