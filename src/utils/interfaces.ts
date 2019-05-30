
export interface IError {
  message: string
  status: number
  field?: string
  instructions?: string
}

export interface IRegister {
	firstName?: string;
	middleName?: string;
	lastName?: string;
	lastName2?: string;
	password?: string;
	password2?: string;
	email?: string;
	account_type?: string;
	role?: string;
}

export interface IClinic {
	name?: string;
	url?: string;
	domain?: string;
	logo?: string;
	password?: string;
	password2?: string;
	address?: string;
	phones?: string;
	emails?: string;
}

export interface IProfileCreation {
	prefix?: string;
	dob?: string;
	phones?: string;
	emails?: string;
	speciality?: string;
	JVPM?: string;
}

export interface Ismtp_data {
	host: string;
	port: any;
	smtp_user: string;
	smtp_pwd: string
}

export interface Imsg_data {
	from: string;
	to: string;
	bcc?: string;
	replyTo?: string;
	subject: string;
	text?: string;
	html: string;
}

export interface Ipayload {
    _id: Document;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    access_level: string;
    active: boolean;
    avatar: boolean;
    account: Document;
}