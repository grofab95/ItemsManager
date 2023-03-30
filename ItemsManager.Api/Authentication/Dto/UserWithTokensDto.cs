using ItemsManager.Api.Users.GetUsers;

namespace ItemsManager.Api.Authentication.Dto;

public class UserWithTokensDto
{
    public UserGetDto User { get; set; }
   
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
}