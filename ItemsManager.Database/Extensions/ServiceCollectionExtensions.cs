using System.Reflection;
using ItemsManager.Core.Users;
using ItemsManager.Database.Stores;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ItemsManager.Database.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddDatabase(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddAutoMapper(Assembly.GetExecutingAssembly());
        
        var connectionString = configuration.GetConnectionString("Database")!;
        services.AddDbContext<ItemsManagerContext>(o => o.UseSqlServer(connectionString));
        //services.AddAutoMapper(typeof(AutoMapperProfile));
        services.AddHostedService<DatabaseManager>();

        services.AddTransient<IUserStore, UserStore>();
    }
}