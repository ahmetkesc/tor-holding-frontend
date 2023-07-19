export interface IMenu {
  id: number;
  title: string;
  path?: string;
  icon?: string;
  subMenus?: IMenu[];
}
