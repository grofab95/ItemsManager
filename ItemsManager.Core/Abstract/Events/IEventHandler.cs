using MediatR;

namespace ItemsManager.Core.Abstract.Events;

public interface IEventHandler<in T> : INotificationHandler<T> where T : IEvent
{
    
}