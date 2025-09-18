export default class ApiResponse<T> {
  constructor(public data: T, public success: boolean, public error: string | null) {}
}