import { Router } from 'express';
import passport from 'passport'
import ClinicController from '../controllers/ClinicController';
import { createClinic } from '../validations/clinicValidation';


class ClinicRoutes extends ClinicController { 
  private router: Router;
  private protected: any;
  
  constructor() {
    super();
    this.router = Router();
    this.routes();
		this.protected = passport.authenticate('jwt', { session: false });
    
  }

  private routes(): void {
    this.router.get('/profile', this.createClinicController);
		this.router.post('/profile', this.protected, createClinic, this.createClinicController);
	}

	public getRouter() {
		return this.router;
	}
}

const clinicRouter = new ClinicRoutes();
export default clinicRouter.getRouter();