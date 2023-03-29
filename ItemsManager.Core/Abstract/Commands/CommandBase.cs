namespace ItemsManager.Core.Abstract.Commands;

public abstract class CommandBase<T> : ICommand<T>
    where T : CommandResultBase
{
    public Guid Id { get; } = Guid.NewGuid();
}