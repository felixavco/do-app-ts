import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import Helpers from '../utils/Helpers';

const PatientSchema = new Schema({
	//* Personal Information
	firstName: { type: String, required: true },
	middleName: { type: String },
	lastName: { type: String, required: true },
	lastName2: { type: String },
	gender: { type: String, required: true },
	dob: { type: Date, required: true },
	//* Contact Information
	email: { type: String },
	phone: { type: String },
	phone2: { type: String },
	//* Clinic history and Information
	weight_history: [
		{
			weight: { type: Number, required: true },
			date: { type: Date, required: true, default: Helpers.getUTCTime() }
		}
	],
	height_history: [
		{
			height: { type: Number, required: true },
			date: { type: Date, required: true, default: Helpers.getUTCTime() }
		}
	],
	alergies: [
		{
			description: { type: String }
		}
	],
	notes: { type: String },
	//* Account Information
	clinic: { type: Schema.Types.ObjectId, ref: 'clinic', required: true },
	creation_date: { type: Date, default: Helpers.getUTCTime() }
});

const Patient = mongoose.model('patient', PatientSchema);

export default Patient;
