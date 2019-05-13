import { Router } from 'express';
import UserController from '../controllers/UserController';
import { registerValidation } from '../validations/UserValidation'

class UserRoutes extends UserController { 
  private router: Router;

  constructor() {
    super();
    this.router = Router();
		this.routes();
  }

  private routes(): void {
		this.router.post('/register', registerValidation, this.registerController);
	}

	public getRouter() {
		return this.router;
	}
}

const userRouter = new UserRoutes();
export default userRouter.getRouter();