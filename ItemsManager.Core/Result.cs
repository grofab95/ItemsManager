namespace ItemsManager.Core;

public class Result<T>
{
    public static Result<T> WithSuccess(T value) => new Result<T>
    {
        Value = value
    };
    
    public static Result<T> WithError(string error) => new Result<T>
    {
        Error = error
    };
    
    public T Value { get; private set; }
    public string Error { get; private  set; }

    public bool IsSuccess => string.IsNullOrEmpty(Error);
    public bool IsFailure => !IsSuccess;

}