import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import cors from 'cors';
import morgan from 'morgan';
import passportJWT from './passportJWT';

//* Routes imports
import userRoutes from '../routes/userRoutes';
import accountRoutes from '../routes/accountRoutes';
import adminRoutes from '../routes/adminRoutes';
import patientRoutes from '../routes/patientRoutes';

class Server {
	private PORT: number;
	private MONGO_URI: string;
	private server: any;

	constructor(PORT: any, MONGO_URI: any) {
		this.PORT = PORT;
		this.MONGO_URI = MONGO_URI;
		this.server = express();
		this.config();
		this.routes();
	}

	private config(): void {
		this.server.use(morgan('dev'));
		this.server.use(cors());
		this.server.use(express.urlencoded({ extended: false }));
		this.server.use(express.json());
		this.server.use(passport.initialize());
		passportJWT(passport);
		mongoose.set('useFindAndModify', false);
	}

	private routes(): void {
		this.server.use('/api/user', userRoutes);
		this.server.use('/api/account', accountRoutes);
		this.server.use('/api/clinic-admin', adminRoutes);
		this.server.use('/api/patient', patientRoutes);
	}

	public start(): void {
		mongoose
			.connect(this.MONGO_URI, {
				useNewUrlParser: true,
				useCreateIndex: true
			})
			.then(() => {
				console.log('Connected to DB');
				this.server.listen(this.PORT, () => console.log('Server started on port ' + this.PORT));
			})
			.catch((err) => console.error(err));
	}
}

export default Server;
