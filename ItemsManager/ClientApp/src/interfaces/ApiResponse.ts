export default interface ApiResponse<T> {
    isSuccess: string
    error: string
    errors: string[]
    data: T
}