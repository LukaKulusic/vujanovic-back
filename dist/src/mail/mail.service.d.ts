import { MailerService } from "@nestjs-modules/mailer";
export declare class MailService {
    private mailerService;
    private readonly logger;
    constructor(mailerService: MailerService);
    sendEmail(email: string, text: string): Promise<void>;
}
