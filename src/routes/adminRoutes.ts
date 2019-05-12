import { Router } from 'express';

class AdminRoutes { 
  private router: Router;

  constructor() {
    // super();
    this.router = Router();
		this.routes();
  }

  private routes(): void {
		this.router.get('/', (req, res) => res.send("Admin Routes "));
	}

	public getRouter() {
		return this.router;
	}
}

const adminRouter = new AdminRoutes();
export default adminRouter.getRouter();