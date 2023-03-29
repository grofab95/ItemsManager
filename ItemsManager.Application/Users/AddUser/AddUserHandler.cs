using ItemsManager.Core.Abstract.Commands;
using ItemsManager.Core.Users;
using Microsoft.Extensions.Logging;

namespace ItemsManager.Application.Users.AddUser;

public class AddUserHandler : ICommandHandler<AddUserCommand, AddUserCommandResult>
{
    private readonly ILogger<AddUserHandler> _logger;
    private readonly IUserStore _userStore;

    public AddUserHandler(ILogger<AddUserHandler> logger, IUserStore userStore)
    {
        _logger = logger;
        _userStore = userStore;
    }
    
    public async Task<AddUserCommandResult> Handle(AddUserCommand request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("AddUserCommand");

        var addUserResult = await _userStore.AddUser(request.Email, request.Password);
        if (addUserResult.IsSuccess)
        {
            return new AddUserCommandResult(request.Id, addUserResult.Value);
        }

        return new AddUserCommandResult(request.Id, addUserResult.Error);
    }
}