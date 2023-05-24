
interface IUser {
  role: any;
  	id?: number;
	firstName: string;
	lastName: string;
	email: string;
	birthdate: string
	phoneNumber: string
	username: string
	password?: string;
}

export default IUser;
