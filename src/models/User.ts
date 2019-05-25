import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import Helpers from '../utils/Helpers';

const UserSchema = new Schema({
	//* Personal Information
	prefix: { type: String },
	firstName: { type: String },
	middleName: { type: String },
	lastName: { type: String,  },
	lastName2: { type: String },
	email: { type: String, required: true, unique: true },
	userName: { type: String, required: true },
	password: { type: String, required: true },
	dob: { type: Date },
	gender: { type: String },
	avatar: { type: String, default: 'avatars/default.jpg' },
	JVPM: { type: String },

	//* Contact Information
	phones: [
		{
			phone: { type: String }, 
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
			institution: { type: String },
			city: { type: String },
			country: { type: String },
			degree: { type: String },
			speciality: { type: String },
			from: { type: Date },
			to: { type: Date },
			description: { type: String }
		}
	],
	experience: [
		{
			institution: { type: String },
			city: { type: String },
			country: { type: String },
			title: { type: String },
			speciality: { type: String },
			from: { type: Date },
			to: { type: Date },
			description: { type: String },
			current: { type: Boolean, default: false }
		}
	],
	location: {
		state: { type: String },
		city: { type: String },
		country: { type: String }
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
