import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import Helpers from '../utils/Helpers';

const AccountSchema = new Schema({
	//* Basic Information
	name: { type: String, unique: true, sparse: true },
	url: { type: String, unique: true, sparse: true },
	domain: { type: String, unique: true, sparse: true },
	logo: { type: String },
	account_type: { type: String },
	description: { type: String },
	address:
	{
		address: { type: String },
		address2: { type: String },
		state: { type: String },
		city: { type: String },
		country: { type: String }
	},
	//* Contact Information
	phones: [
		{
			phone: { type: String },
			phone_type: { type: String }
		}
	],
	emails: [
		{
			email: { type: String }
		}
	],
	social: {
		youtube: { type: String },
		twitter: { type: String },
		facebook: { type: String },
		linkedin: { type: String },
		instagram: { type: String },
		whatsapp: { type: String },
		website: { type: String },
	},
	//* Primary Admin information
	admin_name: { type: String },
	admin_email: { type: String, required: true, unique: true },
	is_admin_email_verified: { type: Boolean, default: false },
	contact_phone: { type: String },
	security_question: { type: String },
	security_answer: { type: String },
	security_question2: { type: String },
	security_answer2: { type: String },
	//* Account Information
	is_domain_verified: { type: Boolean, default: false },
	is_in_trial: { type: Boolean, default: false },
	is_trial_elegible: { type: Boolean, default: true },
	verificationToken: { type: String },
	expVerificationToken: { type: Date },
	creation_date: { type: Date, default: Helpers.getUTCTime() },
});

const Account = mongoose.model('account', AccountSchema);

export default Account;
