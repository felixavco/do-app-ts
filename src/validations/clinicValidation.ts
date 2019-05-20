import { Request, Response, NextFunction } from 'express';
import Validator from 'validator';
import Helper from '../utils/Helpers';
import { IClinic } from '../utils/interfaces';

export const createClinicValidation = (req: Request, res: Response, next: NextFunction) => {
	let errors: IClinic = {};
	const { name, url, domain, logo, address, phones, emails } = req.body;

	if (Helper.isEmpty(name)) {
		errors.name = 'Este campo es obligatorio';
	} else if (!Validator.isLength(name.trim(), { min: 5, max: 250 })) {
		errors.name = 'Este campo require entre 5 a 250 caracteres';
	}

	if (Helper.isEmpty(url)) {
		errors.url = 'Ingrese una URL para su clinica';
	} else if (!Helper.isSlug(url.trim())) {
		errors.url = 'La URL no es valida, solo se permiten letras, numeros, guion y gion bajo';
	}

	if (!Helper.isEmpty(domain)) {
		if (!Helper.isDomain(domain.trim())) {
			errors.domain = 'El dominio no es valido';
		}
	}

	if (Helper.isEmpty(phones)) {
		errors.phones = "Ingrese un telefono de contacto";
	}

	if (!Helper.isEmpty(emails)) {
		emails.forEach(({ email }, index) => {
			if (!Validator.isEmail(email)) {
				errors.emails += `El formato del correo en la posicion ${index + 1} es incorrecto. `;
			}
		});
	} else {
		errors.emails = "Ingrese un correo electronico de contacto";
	}

	if (Helper.isEmpty(address)) {
		errors.address = "Ingrese la Direccion de su Clinica"
	}

	if (!Helper.isEmpty(errors)) {
		return res.status(400).json(errors);
	}

	next();
};
