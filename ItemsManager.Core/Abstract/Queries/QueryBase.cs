using ItemsManager.Core.Abstract.Commands;

namespace ItemsManager.Core.Abstract.Queries;

public abstract class QueryBase<T> : ICommand<T>
    where T : IQueryResultBase
{
    public Guid Id { get; } = Guid.NewGuid();
}