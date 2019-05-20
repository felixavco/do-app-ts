import { Router } from 'express';
import passport from 'passport';
import UserController from '../controllers/UserController';
import { registerValidation, loginValidation, createProfileValidation } from '../validations/UserValidation';

class UserRoutes extends UserController {
	private router: Router;
	private protected: any;

	constructor() {
		super();
		this.protected = passport.authenticate('jwt', { session: false });
		this.router = Router();
		this.routes();
	}

	private routes(): void {
		this.router.post('/register', registerValidation, this.register);
		this.router.post('/login', loginValidation, this.login);
		this.router.get('/verification/:token', this.verification);
		this.router.get('/send-token', this.protected, this.sendToken);
		this.router.post('/profile', this.protected, createProfileValidation, this.userProfile);
	}

	public getRouter() {
		return this.router;
	}
}

const userRouter = new UserRoutes();
export default userRouter.getRouter();
