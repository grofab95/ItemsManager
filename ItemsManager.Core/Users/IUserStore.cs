namespace ItemsManager.Core.Users;

public interface IUserStore
{
    Task<Result<User>> AddUser(string email, string password);
    Task<Result<User[]>> GetUsers();
}