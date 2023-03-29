namespace ItemsManager.Core.Abstract.Queries;

public interface IQueryResultBase
{
    
}

public class QueryResultBase<T> : IQueryResultBase, IMessage
{
    public Guid Id { get; }
    public T? Data { get; }
    public string? Error { get; }
    
    public bool IsSuccess => Error == null;
    public bool IsFailure => Error != null;

    protected QueryResultBase(Guid id, string error)
    {
        Id = id;
        Error = error;
    }
    
    protected QueryResultBase(Guid id, T data)
    {
        Id = id;
        Data = data;
    }
}