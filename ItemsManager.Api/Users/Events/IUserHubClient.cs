using ItemsManager.Core.Users;

namespace ItemsManager.Api.Users.Events;

public interface IUserHubClient
{
    Task UserAdded(User user);
}