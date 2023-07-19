export interface IResult<out T> {
  message: string;
  success: boolean;
  data: T;
}
