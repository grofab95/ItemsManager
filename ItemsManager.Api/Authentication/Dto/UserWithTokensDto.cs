namespace ItemsManager.Api.Authentication.Dto;

public class UserWithTokensDto
{
    public string Id { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public string CreatedAt { get; set; }
    public bool IsActive { get; set; }
    public bool IsOnline { get; set; }
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
}