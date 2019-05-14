import mongoose from 'mongoose';
import uuid from 'uuid/v4';
const Schema = mongoose.Schema;
import Helpers from '../utils/Helpers';

const UserSchema = new Schema({
	//* Personal Information
	refix: { type: String },
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
	//* Contact Information
	phones: [
		{
			phone_id: { type: String, default: 'upid_' + uuid() },
			phone: { type: String, required: true }
		}
	],
	emails: [
		{
			email_id: { type: String, default: 'ueid_' + uuid() },
			email: { type: String }
		}
	],
	//* Education and Experience Information
	speciality: { type: String },
	other_specialities: [
		{
			sp_id: { type: String, default: 'sid_' + uuid() },
			speciality: { type: String }
		}
	],
	education: [
		{
			edu_id: { type: String, default: 'edu_pid_' + uuid() },
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
			exp_id: { type: String, default: 'exp_pid_' + uuid() },
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
	clinic: { type: Schema.Types.ObjectId, ref: 'clinic' },
	role: { type: String, required: true, default: 'doctor' }, // * options: "doctor", "nourse", "assistance", "admin"
	access_level: { type: String, required: true, default: 'basic' }, // * options: "basic", "doctor", "accountant", "full-access"
	active: { type: Boolean, default: true },
	verified: {type: Boolean, default: false },
	resetPwdToken: { type: String },
	expResPwdToken: { type: Date },
	verificationToken: { type: String },
	expVerificationToken: { type: Date },
	creation_date: { type: Date, default: Helpers.getUTCTime() },
});

const User = mongoose.model('user', UserSchema);
export default User;
