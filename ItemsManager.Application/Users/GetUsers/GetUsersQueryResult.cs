using ItemsManager.Core;
using ItemsManager.Core.Abstract.Queries;
using ItemsManager.Core.Users;

namespace ItemsManager.Application.Users.GetUsers;

public class GetUsersQueryResult : QueryResultBase<User[]>
{
    public GetUsersQueryResult(Guid id, string error) : base(id, error)
    {
    }

    public GetUsersQueryResult(Guid id, User[] data) : base(id, data)
    {
    }
}