import nodeMailer from 'nodemailer';
import { Ismtp_data, Imsg_data } from '../utils/interfaces';

class SMTP_MAILER {

    private host: string;
    private port: number;
    private smtp_user: string;
    private smtp_pwd: string
    private from: string;
    private to: string;
    private bcc?: string;
    private replyTo?: string;
    private subject: string;
    private text?: string;
    private html: string;


    constructor(smtp_data: Ismtp_data, msg_data: Imsg_data) {
        this.host = smtp_data.host;
        this.port = smtp_data.port;
        this.smtp_user = smtp_data.smtp_user;
        this.smtp_pwd = smtp_data.smtp_pwd;
        this.from = msg_data.from;
        this.to = msg_data.to;
        this.bcc = msg_data.bcc;
        this.replyTo = msg_data.replyTo;
        this.subject = msg_data.subject;
        this.text = msg_data.text;
        this.html = msg_data.html;
    }


    public send(): Promise<any> {
        const transporter = nodeMailer.createTransport({
            host: this.host,
            port: this.port,
            secure: this.port === 465 ? true : false,
            auth: {
                user: this.smtp_user,
                pass: this.smtp_pwd
            }
        });

        const email = {
            from: this.from,
            to: this.to,
            bcc: this.bcc || "",
            replyTo: this.replyTo || "",
            subject: this.subject,
            text: this.text || "",
            html: this.html
        }

        return transporter.sendMail(email);
    }
}

export default SMTP_MAILER;