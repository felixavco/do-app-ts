import { Router } from 'express';

class UserRoutes { 
  private router: Router;

  constructor() {
    // super();
    this.router = Router();
		this.routes();
  }

  private routes(): void {
		this.router.get('/', (req, res) => res.send("All Users :)"));
	}

	public getRouter() {
		return this.router;
	}
}

const userRouter = new UserRoutes();
export default userRouter.getRouter();