import { Request, Response } from 'express';
import Helpers from '../utils/Helpers';
import User from '../models/User';
import Clinic from '../models/Clinic';

class ClinicController extends Helpers {
  constructor(){
    super();
  }

  	/**
   * @Name createClinicController
   * @Path /api/user/register POST //!Protected
   * @Description Creates clinic profile and set clinic ID to the admin user 
   */
  public createClinicController = async (req: Request, res: Response): Promise<any> => {
    res.status(200).json({msg: "TODO OK"})
  }

}

export default ClinicController;