import { Router } from 'express';
import passport from 'passport';
import UserController from '../controllers/UserController';
import { register, login, createProfile, checkEmail } from '../validations/UserValidation';

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
	//* this.router.method(Route path, Validation?, Controller)
		// this.router.post('/register', register, this.register);
		// this.router.post('/login', login, this.login);
		// this.router.post('/check-email', checkEmail, this.checkEmail);
		// this.router.get('/verification/:token', this.verification);
		// this.router.get('/send-token', this.protected, this.sendToken);
		// this.router.post('/profile', this.protected, createProfile, this.userProfile);
	}

	public getRouter() {
		return this.router;
	}
}

const userRouter = new UserRoutes();
export default userRouter.getRouter();
