using ItemsManager.Core.Abstract.Queries;
using ItemsManager.Core.Users;
using Microsoft.Extensions.Logging;

namespace ItemsManager.Application.Users.GetUser;

public class GetUserHandler : IQueryHandler<GetUserQuery, GetUserQueryResult>
{
    private readonly ILogger<GetUserHandler> _logger;
    private readonly IUserStore _userStore;

    public GetUserHandler(ILogger<GetUserHandler> logger,
        IUserStore userStore)
    {
        _logger = logger;
        _userStore = userStore;
    }
    
    public async Task<GetUserQueryResult> Handle(GetUserQuery request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("GetUserQuery");

        var getUsersResult = await _userStore.GetUser(request.UserId);
        return getUsersResult.IsSuccess
            ? new GetUserQueryResult(request.Id, getUsersResult.Value)
            : new GetUserQueryResult(request.Id, getUsersResult.Error);
    }
}