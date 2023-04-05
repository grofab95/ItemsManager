using ItemsManager.Core.Abstract.Commands;
using ItemsManager.Core.Users;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ItemsManager.Application.Users.AddUser;

public class AddUserHandler : ICommandHandler<AddUserCommand, AddUserCommandResult>
{
    private readonly ILogger<AddUserHandler> _logger;
    private readonly IUserStore _userStore;
    private readonly IMediator _mediator;

    public AddUserHandler(ILogger<AddUserHandler> logger, IUserStore userStore, IMediator mediator)
    {
        _logger = logger;
        _userStore = userStore;
        _mediator = mediator;
    }
    
    public async Task<AddUserCommandResult> Handle(AddUserCommand request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("AddUserCommand");

        var addUserResult = await _userStore.AddUser(request.Email, request.Password);
        if (addUserResult.IsFailure)
        {
            return new AddUserCommandResult(request.Id, addUserResult.Error);
        }
        
        await _mediator.Publish(new UserAddedEvent(addUserResult.Value), cancellationToken);
        return new AddUserCommandResult(request.Id, addUserResult.Value);

    }
}