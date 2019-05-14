import { Request, Response, NextFunction } from 'express';
import Validator from 'validator';
import Helper from '../utils/Helpers';
import { IRegister } from '../utils/interfaces';

export const registerValidation = (req: Request, res: Response, next: NextFunction) => {
	let errors: IRegister = {};
	const { firstName, middleName, lastName, lastName2, email, password, password2 } = req.body;

	//* First Name Validation
	if (Helper.isEmpty(firstName)) {
		errors.firstName = 'El campo nombre es necesario';
	} else if (!Validator.isLength(firstName.trim(), { min: 2, max: 30 })) {
		errors.firstName = 'El nombre debe tener entre 2 a 30 caracteres';
	} else if (!Validator.isAlpha(firstName.trim())) {
		errors.firstName = 'Solamente se permiten letras';
	}

	//* Middle Name Validation
	if (!Helper.isEmpty(middleName)) {
		if (!Validator.isLength(firstName.trim(), { min: 1, max: 30 })) {
			errors.middleName = 'El maximo es 30 caracteres';
		} else if (!Validator.isAlpha(middleName.trim())) {
			errors.middleName = 'Solamente se permiten letras';
		}
	}

	//* Last Name Validation
	if (Helper.isEmpty(lastName)) {
		errors.lastName = 'El campo apellido es necesario';
	} else if (!Validator.isLength(lastName.trim(), { min: 2, max: 30 })) {
		errors.lastName = 'El apellido debe tener entre 2 a 30 caracteres';
	} else if (!Validator.isAlpha(lastName.trim())) {
		errors.lastName = 'Solamente se permiten letras';
	}

	//* LastName2 Name Validation
	if (!Helper.isEmpty(lastName2)) {
		if (!Validator.isLength(lastName2.trim(), { min: 1, max: 30 })) {
			errors.lastName2 = 'El maximo es 30 caracteres';
		} else if (!Validator.isAlpha(lastName2.trim())) {
			errors.lastName2 = 'Solamente se permiten letras';
		}
	}

	//* Email Validation
	if (Helper.isEmpty(email)) {
		errors.lastName = 'El correo electronico es requerido';
	} else if (!Validator.isEmail(email.trim())) {
		errors.email = 'El formato del correo es incorrecto';
	}

	//* Password Validation
	if (Helper.isEmpty(password)) {
		errors.password = 'Ingrese una contraseña';
	} else if (!Validator.isLength(password.trim(), { min: 8, max: 25 })) {
		errors.password = 'La contraseña debe tener como minimo 8 caracteres y maximo 25';
	}

	if (Helper.isEmpty(password2)) {
		errors.password2 = 'Confirme la contraseña';
	} else if (!Validator.equals(password.trim(), password2.trim())) {
		errors.password2 = "Las contraseñas no coinciden";
	}

	if (!Helper.isEmpty(errors)) {
		return res.status(400).json(errors);
	}

	next();
};

export const loginValidation = (req: Request, res: Response, next: NextFunction) => {
	let errors: IRegister = {};
	const { email, password } = req.body;

	if (Helper.isEmpty(email)) {
		errors.lastName = 'Ingrese su Email';
	} else if (!Validator.isEmail(email.trim())) {
		errors.email = 'Hay un problema con el usuario o la contraseña.';
	}

	//* Password Validation
	if (Helper.isEmpty(password)) {
		errors.password = 'Password is required';
	} else if (!Validator.isLength(password.trim(), { min: 8, max: 25 })) {
		errors.password = 'Hay un problema con el usuario o la contraseña';
	}

	if (!Helper.isEmpty(errors)) {
		return res.status(400).json(errors);
	}

	next();
};
