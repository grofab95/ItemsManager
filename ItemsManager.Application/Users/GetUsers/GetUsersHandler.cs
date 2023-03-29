using ItemsManager.Core.Abstract.Queries;
using ItemsManager.Core.Users;
using Microsoft.Extensions.Logging;

namespace ItemsManager.Application.Users.GetUsers;

public class GetUsersHandler : IQueryHandler<GetUsersQuery, GetUsersQueryResult>
{
    private readonly ILogger<GetUsersHandler> _logger;
    private readonly IUserStore _userStore;

    public GetUsersHandler(ILogger<GetUsersHandler> logger,
        IUserStore userStore)
    {
        _logger = logger;
        _userStore = userStore;
    }
    
    public async Task<GetUsersQueryResult> Handle(GetUsersQuery request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("GetUsersQuery");

        var getUsersResult = await _userStore.GetUsers();
        return getUsersResult.IsSuccess
            ? new GetUsersQueryResult(request.Id, getUsersResult.Value)
            : new GetUsersQueryResult(request.Id, getUsersResult.Error);
    }
}