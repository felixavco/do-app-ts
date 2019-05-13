
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
}