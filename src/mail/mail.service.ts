import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, Logger } from "@nestjs/common";
@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  constructor(private mailerService: MailerService) {}

  async sendEmail(email: string, text: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        from: process.env.MAIL_FROM,
        subject: "Rezervacija",
        html: text,
      });
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
