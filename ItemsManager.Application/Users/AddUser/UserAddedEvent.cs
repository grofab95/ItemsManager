using ItemsManager.Core.Abstract;
using ItemsManager.Core.Abstract.Events;
using ItemsManager.Core.Users;

namespace ItemsManager.Application.Users.AddUser;

public record UserAddedEvent(User User) : IEvent;