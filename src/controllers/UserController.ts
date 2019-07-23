import { Request, Response } from 'express';
import Helpers from '../utils/Helpers';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Mailer from '../mailer/Mailer';
//* SMTP
import { Imsg_data } from '../utils/interfaces';
import { smtp_data } from '../config/config';


class UserController extends Helpers {
	private SECRET: string = process.env.SECRET || '';


}

export default UserController;
