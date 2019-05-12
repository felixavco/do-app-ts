import { Router } from 'express';
import AdminController from '../controllers/AdminController';

class AdminRoutes extends AdminController { 
  private router: Router;

  constructor() {
    super();
    this.router = Router();
		this.routes();
  }

  private routes(): void {
		this.router.get('/', this.test);
	}

	public getRouter() {
		return this.router;
	}
}

const adminRouter = new AdminRoutes();
export default adminRouter.getRouter();