using ItemsManager.Core.Abstract.Queries;

namespace ItemsManager.Application.Users.GetUser;

public class GetUserQuery : QueryBase<GetUserQueryResult>
{
    public string UserId { get; }
    
    public GetUserQuery(string userId)
    {
        UserId = userId;
    }
}