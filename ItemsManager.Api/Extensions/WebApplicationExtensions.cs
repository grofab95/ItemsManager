using ItemsManager.Api.Users.Events;
using Microsoft.AspNetCore.Builder;

namespace ItemsManager.Api.Extensions;

public static class WebApplicationExtensions
{
    public static void ConfigureApi(this WebApplication app)
    {
        app.MapControllers();
        app.MapHub<UserEventsHub>("/user-events");
    }
}