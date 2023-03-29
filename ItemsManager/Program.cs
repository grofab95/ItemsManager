using ItemsManager.Api.Extensions;
using ItemsManager.Authentication.Extensions;
using ItemsManager.Core.Extensions;
using ItemsManager.Database.Extensions;
using ItemsManager.Logging;
using Serilog;

SerilogHelpers.AddLoggerConfiguration();

try
{
    Log.Information("Program start");

    var builder = WebApplication.CreateBuilder(args);
    
    builder.Logging.AddSerilog();
    builder.Services.AddDatabase(builder.Configuration);
    builder.Services.AddAppAuthentication(builder.Configuration);
    builder.Services.AddApi();
    builder.Services.AddCore();

    var app = builder.Build();
    app.ConfigureApi();
    app.ConfigureAuthorization();

    app.Run();
}
catch (Exception e)
{
    Log.Fatal(e, "Program error");
}
finally
{
    Log.CloseAndFlush();
}

