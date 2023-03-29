using Microsoft.AspNetCore.Builder;

namespace ItemsManager.Authentication.Extensions;

public static class WebApplicationExtensions
{
    public static void ConfigureAuthorization(this WebApplication app)
    {
        app.UseAuthentication();
        app.UseAuthorization();
    }
}