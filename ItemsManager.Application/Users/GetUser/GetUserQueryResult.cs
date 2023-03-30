using ItemsManager.Core.Abstract.Queries;
using ItemsManager.Core.Users;

namespace ItemsManager.Application.Users.GetUser;

public class GetUserQueryResult : QueryResultBase<User>
{
    public GetUserQueryResult(Guid id, string error) : base(id, error)
    {
    }

    public GetUserQueryResult(Guid id, User data) : base(id, data)
    {
    }
}