import { Request, Response } from 'express';

class AdminController {
  constructor() {
    // super()
  }

  /**
   * test
   */
  public async test(req: Request, res: Response): Promise<any> {
		res.send('This is a test route');
	}
}

export default AdminController;