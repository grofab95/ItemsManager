using ItemsManager.Core.Abstract.Commands;

namespace ItemsManager.Application.Users.AddUser;

public class AddUserCommand : CommandBase<AddUserCommandResult>
{
    public string Email { get; }
    public string Password { get; }

    public AddUserCommand(string email, string password)
    {
        Email = email;
        Password = password;
    }
}