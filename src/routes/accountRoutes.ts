import { Router } from 'express';
import passport from 'passport'
import AccountController from '../controllers/AccountController';
import { createClinicValidation } from '../validations/clinicValidation';


class AccountRoutes extends AccountController { 
  private router: Router;
	private protected: any;
  
  constructor() {
    super();
    this.protected = passport.authenticate('jwt', { session: false });
    this.router = Router();
    this.routes();    
  }

  private routes(): void {
    // this.router.get('/profile/:account_id', this.getAccountProfile);
		// this.router.post('/profile', this.protected, createClinicValidation, this.accountProfile);
	}

	public getRouter() {
		return this.router;
	}
}

const accountRoutes = new AccountRoutes();
export default accountRoutes.getRouter();