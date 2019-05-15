import { Request, Response } from 'express';
import Helpers from '../utils/Helpers';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User';
import Account from '../models/Account';
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

class UserController extends Helpers {
	private SECRET: string = process.env.SECRET || '';

	constructor() {
		super();
	}

	/**
   * @Name registerController
   * @Path /api/user/register POST //*Public
   * @Description Register new user with super admin rights, sends a confirmation email and returns jwt token 
   */
	public registerController = async (req: Request, res: Response): Promise<any> => {
		try {
			const { firstName, middleName, lastName, lastName2, email, password, account_type, role } = req.body;

			//* Checking if user exists
			const user = await User.findOne({ email });

			if (user) {
				throw this.setError(`El correo ${email} ya esta registrado`, 409);
			}

			//* Create a random verification token
			const verificationToken = await crypto.randomBytes(32).toString('hex');
			//* Set expiration to verification token
			const expVerificationToken = Date.now() + 3600000; //* Token will expire in 1 Hour

			//* Links new user with an account
			const newAccountData = {
				admin_name: firstName + ' ' + lastName,
				admin_email: email,
				account_type,
				verificationToken,
				expVerificationToken
			};

			//* Saves the new account and returns the new account object
			const newAccount = await new Account(newAccountData).save();

			// * if the user does not exist, the user is registered
			const newUserData = {
				role,
				firstName,
				middleName,
				lastName,
				lastName2,
				email,
				password,
				userName: email.split('@')[0],
				access_level: 'full-access',
				account: newAccount._id
			};

			//* Message Data to send to verification email
			const messageData = { firstName, lastName, email, token: verificationToken };

			//* Encrypt user password
			bcrypt.genSalt(12, (err, salt) => {
				if (err) throw err;
				bcrypt.hash(newUserData.password, salt, async (err, hash) => {
					if (err) throw err;
					newUserData.password = hash;
					const newUser = await new User(newUserData).save();

					//TODO Send Verification Token PENDING.... send verification message
					console.log(messageData);

					//* Prepare data to be via token
					const payload = {
						_id: newUser._id,
						firstName: newUser.firstName,
						lastName: newUser.lastName,
						email: newUser.email,
						role: newUser.role,
						access_level: newUser.access_level,
						active: newUser.active,
						avatar: newUser.avatar,
						account: newUser.account
					};
					//* send jwt token
					jwt.sign(payload, this.SECRET, { expiresIn: '1d' }, (err, token) => {
						res.status(200).json({
							success: true,
							token: `Bearer ${token}`
						});
					});
				});
			});
		} catch (error) {
			res.status(error.status || 500).json(error);
		}
	};

	/**
   * @Name loginController
   * @Path /api/user/login GET //*Public
   * @Description Authentices user and returns a web token 
   */
	public loginController = async (req: Request, res: Response): Promise<any> => {
		try {
			const { email: reqEmail, password } = req.body;
			//* Find user
			const user = await User.findOne({ email: reqEmail });
			if (!user) {
				throw this.setError('No se encontro el usuario', 404, 'email');
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				throw this.setError('La contraseña es incorrecta', 401, 'password');
			}

			const { _id, firstName, lastName, role, access_level, active, avatar, account } = user;

			const payload = {
				_id,
				firstName,
				lastName,
				role,
				access_level,
				active,
				avatar,
				account
			};

			//* send jwt token
			jwt.sign(payload, this.SECRET, { expiresIn: '1d' }, (err, token) => {
				res.status(200).json({
					success: true,
					token: `Bearer ${token}`
				});
			});
		} catch (error) {
			res.status(error.status || 500).json(error);
		}
	};

	/**
   * @Name verificationController
   * @Path /api/user/verification/:token GET //*Public
   * @Description Checks if the token matches with the user verification token stored in the DB
   */
	public verificationController = async (req: Request, res: Response): Promise<any> => {
		try {
			const { token } = req.params;

			const userAccount = await Account.findOne({
				verificationToken: token,
				expVerificationToken: { $gt: Date.now() } //* checks if the token is expired
			});

			if (!userAccount) {
				throw this.setError('Invalid token or token expired', 401, 'verification_token');
			}

			const updatedAccount: any = await Account.findByIdAndUpdate(
				userAccount._id,
				{ is_admin_email_verified: true },
				{ new: true }
			);

			//* Find the admin user asociated with the account
			const user: any = await User.findOne({ account: updatedAccount._id });

			const { _id, firstName, lastName, role, access_level, active, verified, avatar, account } = user;

			const payload = {
				_id,
				firstName,
				lastName,
				role,
				access_level,
				active,
				verified,
				avatar,
				account
			};

			// //* send jwt token
			jwt.sign(payload, this.SECRET, { expiresIn: '1d' }, (err, token) => {
				res.status(200).json({
					success: true,
					token: `Bearer ${token}`
				});
			});
		} catch (error) {
			res.status(error.status || 500).json(error);
		}
	};

	/**
   * @Name sendTokenController
   * @Path /api/user/send-token GET //!Protected
   * @Description Sends a new verification token, this act
   */
	public sendTokenController = async (req: Request, res: Response): Promise<any> => {
		try {
			const _id = req.user.account;
			//* Create a new random verification token
			const verificationToken = await crypto.randomBytes(32).toString('hex');
			//* Set expiration to verification token
			const expVerificationToken = Date.now() + 3600000; //* Token will expire in 1 Hour

			const updatedTokenInfo = {
				verificationToken,
				expVerificationToken
			};

			const account: any = await Account.findByIdAndUpdate(_id, updatedTokenInfo, { new: true });

			//* Message Data to send to verification email
			const { admin_name, admin_email, verificationToken: token } = account;
			const messageData = { admin_name, admin_email, token };

			//TODO Pending implement send mail functionality
			console.log(messageData);

			res.status(200).json({ message: 'verification token sent' });
		} catch (error) {
			res.status(error.status || 500).json(error);
		}
	};
}

export default UserController;
