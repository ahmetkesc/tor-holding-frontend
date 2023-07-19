export interface ISession<out T> {
  logged: boolean;
  data: T;
}
