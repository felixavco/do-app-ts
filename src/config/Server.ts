import express from 'express';
import passport from 'passport';
import cors from 'cors';
import morgan from 'morgan';
import passportJWT from './passportJWT';
import sequelize from './connectionDB';

//* Routes imports
import userRoutes from '../routes/userRoutes';
import accountRoutes from '../routes/accountRoutes';
import adminRoutes from '../routes/adminRoutes';
import patientRoutes from '../routes/patientRoutes';

class Server {
	private PORT: number;
	private server: any;

	constructor(PORT: any) {
		this.PORT = PORT;
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
	}

	private routes(): void {
		this.server.use('/api/user', userRoutes);
		this.server.use('/api/account', accountRoutes);
		this.server.use('/api/clinic-admin', adminRoutes);
		this.server.use('/api/patient', patientRoutes);
	}

	public start(): void {
		sequelize
		.authenticate()
		.then(() => {
			console.log("Connected to DB");
			this.server.listen(this.PORT, () => console.log('Server started on port ' + this.PORT));
		})
		.catch((err) => {
			console.error("Connection Error:" + err);
		})
		
	}
}

export default Server;
