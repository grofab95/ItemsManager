using MediatR;

namespace ItemsManager.Core.Abstract.Commands;

public interface ICommand<out TResult> : IMessage, IRequest<TResult>
{
}