namespace ItemsManager.Authentication.Options;

public class AuthenticationOption
{
    public const string SectionKey = "Authentication";

    public PasswordOption Password { get; set; }
}