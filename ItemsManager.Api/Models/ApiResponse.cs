namespace ItemsManager.Api.Models;

public class ApiResponse<T>
{
    public static ApiResponse<T> Success(T data) => new(data);
    public static ApiResponse<T> Failure(string error) => new(error);
    public static ApiResponse<T> Failure(Exception exception) => new(exception.Message);
    public static ApiResponse<T> Failure(string[] errors) => new(errors);

    public T Data { get; }
    public string Error { get; }
    public string[] Errors { get; }

    public bool IsError => !string.IsNullOrEmpty(Error) || Errors != null;
    public bool IsSuccess => string.IsNullOrEmpty(Error) && Errors == null;

    private ApiResponse(T data)
    {
        Data = data;
    }

    private ApiResponse(string error)
    {
        Error = error;
    }
    
    private ApiResponse(string[] errors)
    {
        Errors = errors;
    }
}

public class ApiResponse<TSuccess, TFail>
{
    public static ApiResponse<TSuccess, TFail> Success(TSuccess data) => new(data);
    public static ApiResponse<TSuccess, TFail> Failure(TFail error) => new(error);
    
    public TSuccess Data { get; }
    public TFail Error { get; }

    private ApiResponse(TSuccess data)
    {
        Data = data;
    }
    
    private ApiResponse(TFail error)
    {
        Error = error;
    }
}

public class ApiResponse
{
    public static ApiResponse Success() => new();
    public static ApiResponse Failure(string error) => new(error);
    public static ApiResponse Failure(Exception exception) => new(exception.Message);
    public static ApiResponse Failure(string[] errors) => new(errors);

    public string Error { get; }
    public string[] Errors { get; }

    public bool IsError => !string.IsNullOrEmpty(Error) || Errors != null;
    public bool IsSuccess => string.IsNullOrEmpty(Error) && Errors == null;

    private ApiResponse()
    {
    }

    private ApiResponse(string error)
    {
        Error = error;
    }
    
    private ApiResponse(string[] errors)
    {
        Errors = errors;
    }
}