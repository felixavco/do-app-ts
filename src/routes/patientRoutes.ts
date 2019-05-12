import { Router } from 'express';

class PatientRoutes { 
  private router: Router;

  constructor() {
    // super();
    this.router = Router();
		this.routes();
  }

  private routes(): void {
		this.router.get('/', (req, res) => res.send("Patient Routes "));
	}

	public getRouter() {
		return this.router;
	}
}

const patientRouter = new PatientRoutes();
export default patientRouter.getRouter();