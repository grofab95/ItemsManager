using System.Reflection;
using ItemsManager.Core.Users;
using Microsoft.Extensions.DependencyInjection;

namespace ItemsManager.Core.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddCore(this IServiceCollection services)
    {
        var files = Directory
            .EnumerateFiles(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), "ItemsManager.*.dll", SearchOption.AllDirectories)
            .ToList();
        
        var assemblies = files.Select(Assembly.LoadFrom).ToList();

        assemblies.Add(Assembly.GetExecutingAssembly());
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(assemblies.ToArray()));
        
        //services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(User).Assembly));
    }
}