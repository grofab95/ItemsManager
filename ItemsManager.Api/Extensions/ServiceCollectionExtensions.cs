using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace ItemsManager.Api.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddApi(this IServiceCollection services)
    {
        services.AddAutoMapper(Assembly.GetExecutingAssembly());
        services.AddControllers();
        services.AddSignalR();
    }
}