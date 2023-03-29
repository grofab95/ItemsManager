using Microsoft.AspNetCore.Builder;

namespace ItemsManager.Api.Extensions;

public static class WebApplicationExtensions
{
    public static void ConfigureApi(this WebApplication app)
    {
        app.MapControllers();
    }
}