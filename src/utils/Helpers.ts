import { IError } from './interfaces';

class Helpers {
	/**
   * Name: setError
   * Description: Creates a custom error object, {required fields: message: str, status:num}, {optional: field?: str instructions?: str}
   */
	public setError(message: string, status: number, field?: string, instructions?: string): IError {
		return { message, status, field, instructions };
	}

	/**
    * Name: setError (static method)
    * Description: Creates a custom error object, {required fields: message: str, status:num}, {optional: field?: str instructions?: str}
    */
	public static setError(message: string, status: number, field?: string, instructions?: string): IError {
		return { message, status, field, instructions };
	}

	/**
    * Name: getUTCTime
    * Description: Returns date current date in UTC format
    */
	public getUTCTime() {
		const now = new Date();
		const UTC_Time = Date.UTC(
			now.getUTCFullYear(),
			now.getUTCMonth(),
			now.getUTCDate(),
			now.getUTCHours(),
			now.getUTCMinutes(),
			now.getUTCSeconds()
		);
		return UTC_Time;
   }
   
   /**
    * Name: getUTCTime (static method)
    * Description: Returns date current date in UTC format
    */
	public static getUTCTime() {
		const now = new Date();
		const UTC_Time = Date.UTC(
			now.getUTCFullYear(),
			now.getUTCMonth(),
			now.getUTCDate(),
			now.getUTCHours(),
			now.getUTCMinutes(),
			now.getUTCSeconds()
		);
		return UTC_Time;
	}
}

export default Helpers;
