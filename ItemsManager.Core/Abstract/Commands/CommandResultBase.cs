namespace ItemsManager.Core.Abstract.Commands;

public abstract class CommandResultBase : IMessage
{
    public Guid Id { get; }
    public string? Error { get; }
    
    public bool IsSuccess => Error == null;
    public bool IsFailure => Error != null;

    protected CommandResultBase(Guid id, string error)
    {
        Id = id;
        Error = error;
    }
    
    protected CommandResultBase(Guid id)
    {
        Id = id;
    }
}