import { Request, Response, NextFunction } from 'express';
import Validator from 'validator';
import Helper from '../utils/Helpers';
import { IRegister } from '../utils/interfaces';

	
	export const registerValidation = (req: Request, res: Response, next: NextFunction ) => {

		let errors: IRegister = {}
		const { firstName, middleName, lastName, lastName2, email, password, password2 } = req.body;

		//* First Name Validation
		if (Helper.isEmpty(firstName)) {
			errors.firstName = 'First Name is Required!';
		} else if (!Validator.isLength(firstName.trim(), { min: 2, max: 50 })) {
			errors.firstName = 'First Name must have between 2 and 50 characters';
		} else if (!Validator.isAlpha(firstName.trim())) {
			errors.firstName = 'Only letters are accepted!';
		}

		//* Middle Name Validation
		if (!Helper.isEmpty(middleName)) {
			if (!Validator.isLength(firstName.trim(), { min: 1, max: 50 })) {
				errors.middleName = 'Max 50 characters';
			} else if (!Validator.isAlpha(middleName.trim())) {
				errors.middleName = 'Only letters are accepted!';
			}
		}

		//* Last Name Validation
		if (Helper.isEmpty(lastName)) {
			errors.lastName = 'Last Name is Required!';
		} else if (!Validator.isLength(lastName.trim(), { min: 2, max: 50 })) {
			errors.lastName = 'Last Name must have between 2 and 50 characters';
		} else if (!Validator.isAlpha(lastName.trim())) {
			errors.lastName = 'Only letters are accepted!';
		}

		//* LastName2 Name Validation
		if (!Helper.isEmpty(lastName2)) {
			if (!Validator.isLength(lastName2.trim(), { min: 1, max: 50 })) {
				errors.lastName2 = 'Max 50 characters';
			} else if (!Validator.isAlpha(lastName2.trim())) {
				errors.lastName2 = 'Only letters are accepted!';
			}
		}

		//* Email Validation
		if (Helper.isEmpty(email)) {
			errors.lastName = 'Email is Required!';
		} else if (!Validator.isEmail(email.trim())) {
			errors.email = 'Invaild Email format';
		}

		//* Password Validation
		if (Helper.isEmpty(password)) {
			errors.password = 'Password is required';
		} else if (!Validator.isLength(password.trim(), { min: 8, max: 25 })) {
			errors.password = 'Password must be 8 characters in length';
		}

		if (Helper.isEmpty(password2)) {
			errors.password2 = 'Confirm your password';
		} else if (!Validator.equals(password.trim(), password2.trim())) {
			errors.password2 = "Passwords don't match";
		}

		if (!Helper.isEmpty(errors)) {
			return res.status(400).json(errors)
		}

		next();
		
	}

