import mongoose from 'mongoose';
import uuid from 'uuid/v4';
const Schema = mongoose.Schema;
import Helpers from '../utils/Helpers';

const UserSchema = new Schema({
	//* Personal Information
	firstName: { type: String, required: true },
	middleName: { type: String },
	lastName: { type: String, required: true },
	lastName2: { type: String },
	userName: { type: String, required: true },
	dob: { type: Date },
	gender: { type: String, required: true },
	avatar: { type: String },
	//* Contact Information
	phones: [
		{
			phone_id: { type: String, default: 'pid_' + uuid() },
			phone: { type: String, required: true }
		}
	],
	emails: [
		{
			email_id: { type: String, default: 'eid_' + uuid() },
			email: { type: String }
		}
	],
	//* Education and Experience Information
	especiality: { type: String, required: true },
	other_especialities: [ { type: String } ],
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
	//* Account Information
	clinic: { type: Schema.Types.ObjectId, ref: 'clinic', required: true },
	role: { type: String, required: true, default: 'doctor' }, // * options: "doctor", "nourse", "assistance", "admin"
	access_level: { type: String, required: true, default: 'basic' }, // * options: "basic", "doctor", "accountant", "full-access"
	is_active: { type: Boolean, default: true },
	creation_date: { type: Date, default: Helpers.getUTCTime() }
});

const User = mongoose.model('user', UserSchema);
export default User;
