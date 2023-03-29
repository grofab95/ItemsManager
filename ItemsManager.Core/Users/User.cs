namespace ItemsManager.Core.Users;

public class User
{
    public string Id { get; set; }
    public string Email { get; set; }
    public string CreatedAt { get; set; }
    public bool IsActive { get; set; }
    public bool IsOnline { get; set; }
}