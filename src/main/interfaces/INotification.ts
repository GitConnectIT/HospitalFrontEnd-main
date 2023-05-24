import eNotificationType from "../assets/enums/eNotificationType";

export default interface INotification {
  id?: any;
  message: string;
  type?: eNotificationType;
  timeout?: number; //milliseconds
}
