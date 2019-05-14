import { Router } from 'express';
import UserController from '../controllers/UserController';
import { registerValidation, loginValidation } from '../validations/UserValidation'

class UserRoutes extends UserController { 
  private router: Router;

  constructor() {
    super();
    this.router = Router();
		this.routes();
  }

  private routes(): void {
		this.router.post('/register', registerValidation, this.registerController);
		this.router.post('/login', loginValidation, this.loginController);
		this.router.get('/verification/:token', this.verificationController);
	}

	public getRouter() {
		return this.router;
	}
}

const userRouter = new UserRoutes();
export default userRouter.getRouter();