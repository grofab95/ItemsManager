using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace ItemsManager.Database;

public class DatabaseManager : IHostedService
{
    private readonly ILogger<DatabaseManager> _logger;
    private readonly ItemsManagerContext _itemsManagerContext;

    public DatabaseManager(ILogger<DatabaseManager> logger, ItemsManagerContext itemsManagerContext)
    {
        _logger = logger;
        _itemsManagerContext = itemsManagerContext;
    }
    
    public async Task StartAsync(CancellationToken cancellationToken)
    {
        await MigrateDatabase(cancellationToken);
    }

    private async Task MigrateDatabase(CancellationToken cancellationToken)
    {
        try
        {
            _logger.LogInformation("MigrateDatabase");
            
            await _itemsManagerContext.Database.MigrateAsync(cancellationToken: cancellationToken);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "MigrateDatabase error");
        }
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
}