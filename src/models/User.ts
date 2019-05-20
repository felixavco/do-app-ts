import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import Helpers from '../utils/Helpers';

const UserSchema = new Schema({
	//* Personal Information
	prefix: { type: String },
	firstName: { type: String, required: true },
	middleName: { type: String },
	lastName: { type: String, required: true },
	lastName2: { type: String },
	email: { type: String, required: true, unique: true },
	userName: { type: String },
	password: { type: String, required: true },
	dob: { type: Date },
	gender: { type: String },
	avatar: { type: String, default: 'avatars/default.jpg' },
	JVPM: { type: String },

	//* Contact Information
	phones: [
		{
			phone: { type: String, required: true }, 
			phone_type: { type: String, default: "phone" }
		}
	],
	emails: [
		{
			email: { type: String }
		}
	],
	//* Education and Experience Information
	speciality: { type: String },
	other_specialities: [
		{
			speciality: { type: String }
		}
	],
	education: [
		{
			institution: { type: String, required: true },
			city: { type: String, required: true },
			country: { type: String, required: true },
			degree: { type: String, required: true },
			speciality: { type: String },
			from: { type: Date, required: true },
			to: { type: Date, required: true },
			description: { type: String }
		}
	],
	experience: [
		{
			institution: { type: String, required: true },
			city: { type: String, required: true },
			country: { type: String, required: true },
			title: { type: String, required: true },
			speciality: { type: String },
			from: { type: Date, required: true },
			to: { type: Date, required: true },
			description: { type: String },
			current: { type: Boolean, default: false }
		}
	],
	location: {
		state: { type: String, required: true },
		city: { type: String, required: true },
		country: { type: String, required: true }
	},
	//* Account Information
	account: { type: Schema.Types.ObjectId, ref: 'account' },
	role: { type: String, required: true }, // * options: "doctor", "nourse", "assistance", "admin"
	access_level: { type: String, required: true, default: 'basic' }, // * options: "basic", "doctor", "accountant", "full-access"
	active: { type: Boolean, default: true },
	public_serchable: { type: Boolean, default: false },
	resetPwdToken: { type: String },
	expResPwdToken: { type: Date },
	creation_date: { type: Date, default: Helpers.getUTCTime() },
});

const User = mongoose.model('user', UserSchema);
export default User;
