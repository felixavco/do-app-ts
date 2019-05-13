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

		/**
    * Name: is_Empty,
    * Description: Evaluates if an element is empty, returns boolean value
    */
	 public isEmpty(value: any): boolean {
		return (
			value === undefined ||
			value === null ||
			(typeof value === 'object' && Object.keys(value).length === 0) ||
			(typeof value === 'string' && value.trim().length === 0)
		);
  }
  
  /**
    * Name: is_Empty (static method),
    * Description: Evaluates if an element is empty, returns boolean value
    */
	public static isEmpty(value: any): boolean {
		return (
			value === undefined ||
			value === null ||
			(typeof value === 'object' && Object.keys(value).length === 0) ||
			(typeof value === 'string' && value.trim().length === 0)
		);
	}
}

export default Helpers;




