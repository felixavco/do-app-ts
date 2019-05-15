import { Request, Response, NextFunction } from 'express';
import Validator from 'validator';
import Helper from '../utils/Helpers';
import { IClinic } from '../utils/interfaces';

export const createClinicValidation = (req: Request, res: Response, next: NextFunction) => {
	let errors: IClinic = {};
	const { name, url, domain, logo } = req.body;

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

	next();
};
