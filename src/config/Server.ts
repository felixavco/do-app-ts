import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import cors from 'cors';
import morgan from 'morgan';
import passportJWT from './passportJWT';

//* Routes imports
import userRoutes from '../routes/userRoutes';
import clinicRoutes from '../routes/clinicRoutes';
import adminRoutes from '../routes/adminRoutes';
import patientRoutes from '../routes/patientRoutes';

class Server {
	private PORT: number;
	private MONGO_URI: string;
	private app: express.Application;

	constructor(PORT: any, MONGO_URI: any) {
		this.PORT = PORT;
		this.MONGO_URI = MONGO_URI;
		this.app = express();
		this.config();
		this.routes();
	}

	private config(): void {
    this.app.use(morgan('dev'));
    this.app.use(cors());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(express.json());
    this.app.use(passport.initialize());
    passportJWT(passport);
		mongoose.set('useFindAndModify', false);
	}

	private routes(): void {
		this.app.use('/api/user', userRoutes);
		this.app.use('/api/clinic', clinicRoutes);
		this.app.use('/api/clinic-admin', adminRoutes);
		this.app.use('/api/patient', patientRoutes);
	}

	public start(): void {
		mongoose
			.connect(this.MONGO_URI, {
				useNewUrlParser: true,
				useCreateIndex: true
			})
			.then(() => {
				console.log('Connected to DB');
				this.app.listen(this.PORT, () => console.log('Server started on port ' + this.PORT));
			})
			.catch((err) => console.error(err));
	}
}

export default Server;
