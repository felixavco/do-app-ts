import { Request, Response } from 'express';
import Helpers from '../utils/Helpers';
import User from '../models/User';
import Account from '../models/Account';

class ClinicController extends Helpers {
  constructor() {
    super();
  }

  /**
   * Name: createClinicController
   * Path: /api/user/register //!Protected POST
   * Description: Creates or Update account profile 
   */
  public accountProfile = async (req: Request, res: Response): Promise<any> => {
    try {
      const { account, _id } = req.user;

      const { state, city, country } = req.body.address;

      const userLocation = { state, city, country };

      const accountData = { ...req.body };

      const updatedAccount = await Account.findByIdAndUpdate(account, accountData, { new: true })

      //* Sets the user location to public search 
      await User.findByIdAndUpdate(_id, {location: userLocation});

      res.status(200).json(updatedAccount);

    } catch (error) {
      res.status(error.status || 500).jsonp(error || error.message);
    }
  }

  /**
   * Name: createClinicController
   * Path: /api/user/register //*Public GET
   * Description: Creates or Update account profile 
   */
  public getAccountProfile = async (req: Request, res: Response): Promise<any> => {
    try {
      const { account_id } = req.params;

      const account = await Account.findById({ _id: account_id });

      // const { locations, phones, emails, _id } = account;

      const response = {

      }

      res.status(200).json(account);

    } catch (error) {
      res.status(error.status || 500).jsonp(error || error.message)
    }
  }

}

export default ClinicController;