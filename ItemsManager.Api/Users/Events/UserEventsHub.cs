using Microsoft.AspNet.SignalR;

namespace ItemsManager.Api.Users.Events;

[Authorize]
public class UserEventsHub : Microsoft.AspNetCore.SignalR.Hub<IUserHubClient>
{
    
}