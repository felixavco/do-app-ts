import { Router } from 'express';

class ClinicRoutes { 
  private router: Router;

  constructor() {
    // super();
    this.router = Router();
		this.routes();
  }

  private routes(): void {
		this.router.get('/', (req, res) => res.send("Clinic Routes "));
	}

	public getRouter() {
		return this.router;
	}
}

const clinicRouter = new ClinicRoutes();
export default clinicRouter.getRouter();