using System.Reflection;
using Serilog;

namespace ItemsManager.Logging;

public static class SerilogHelpers
{
    public static void AddLoggerConfiguration()
    {
        const string outputTemplate = "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level:u4}][{SourceContext}] {Message:lj}{NewLine}{Exception}";

        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile(path:"appsettings.json", optional: false, reloadOnChange: true)
            .Build();

        Log.Logger = new LoggerConfiguration()
            .ReadFrom.Configuration(configuration)
            
            .Enrich.FromLogContext()
            .WriteTo.Console(outputTemplate: outputTemplate)
            .WriteTo.File(Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location) ?? string.Empty, "logs/log-.log"),
                rollingInterval: RollingInterval.Day,
                outputTemplate: outputTemplate)
            .CreateLogger();
    }
}