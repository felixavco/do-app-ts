import { Request, Response } from 'express';
import Helpers from '../utils/Helpers';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User';
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

class UserController extends Helpers {
	private SECRET: string = process.env.SECRET || '';

	/**
   * @Name registerController
   * @Path /api/user/register POST Public
   * @Description Register new user and returns jwt token 
   */
	public async registerController(req: Request, res: Response): Promise<any> {
		try {
			const { firstName, middleName, lastName, lastName2, email, password } = req.body;

			//* Checking if user exists
			const user = await User.findOne({ email });
			if (user) {
				throw new Error("ERROR")
			}

			//* Create a random verification token
			const verificationToken = await crypto.randomBytes(32).toString('hex');
			//* Set expiration to verification token
			const expVerificationToken = Date.now() + 3600000; //* Token will expire in 1 Hour

			// * if the user does not exist, the user is registered
			const newUser = {
				firstName,
				middleName,
				lastName,
				lastName2,
				email,
				password,
				userName: email.split('@')[0], 
				access_level: "full-access"
			};

			//* Message Data to send to verification email
			const messageData = { firstName, email, token: verificationToken };

			//* Encrypt user password
			bcrypt.genSalt(12, (err, salt) => {
				bcrypt.hash(newUser.password, salt, async (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					const createdUser = await new User(newUser).save();

					//TODO Send Verification Token
					console.log(messageData);
					//TODO PENDING.... send verification message

					//TODO Pending send jwt token
					res.status(200).json(createdUser);
				});
			});
		} catch (error) {
			res.status(error.status || 500).json(error.message);
		}
	}
}

export default UserController;
