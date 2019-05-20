
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