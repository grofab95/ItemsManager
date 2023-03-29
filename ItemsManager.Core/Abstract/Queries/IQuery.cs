using MediatR;

namespace ItemsManager.Core.Abstract.Queries;

public interface IQuery<out TResult> : IRequest<TResult>
{

}