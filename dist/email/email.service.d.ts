import { CreateEmailDto } from './dto/create-email.dto';
export declare class EmailService {
    private readonly logger;
    private readonly emailLili;
    constructor();
    create(createEmailDto: CreateEmailDto): string;
    private _transporter;
    sendPassword(fullName: string, email: string, password: string): void;
    private readonly head;
    private readonly footer;
}
