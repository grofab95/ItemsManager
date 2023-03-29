using System.ComponentModel.DataAnnotations;

namespace ItemsManager.Api.Authentication.Requests;

public class LoginRequest
{
    [Required(ErrorMessage = "User name is required")]
    public string Email { get; set; }
        
    [Required(ErrorMessage = "Password is required")]
    public string Password { get; set; }
}