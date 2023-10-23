"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer_1 = require("nodemailer");
const googleapis_1 = require("googleapis");
let EmailService = class EmailService {
    constructor() {
        this.logger = new common_1.Logger('EmailService');
        this.head = '<!DOCTYPE html>' +
            '<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">' +
            '<head>' +
            '<meta charset="utf-8"> ' +
            '<meta name="viewport" content="width=device-width"> ' +
            '<meta http-equiv="X-UA-Compatible" content="IE=edge"> ' +
            '<meta name="x-apple-disable-message-reformatting"> ' +
            '<title>Opportunity</title> ' +
            '</head>';
        this.footer = '</td>' +
            '</tr> ' +
            '<tr>' +
            '<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">' +
            '<tr>' +
            '<td style="padding: 40px 40px 10px 40px; font-family: sans-serif; font-size: 12px; line-height: 18px; color: #666666; text-align: center; font-weight:normal;">' +
            '<p style="margin: 0;">'
            + 'UDEMY</p>' +
            '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="padding: 0px 40px 10px 40px; font-family: sans-serif; font-size: 12px; line-height: 18px; color: #666666; text-align: center; font-weight:normal;">' +
            '<p style="margin: 0;">'
            + 'Si usted recibió este email por error por favor comuniquese con: planck.biz@gmail.com</p>' +
            '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="padding: 0px 40px 40px 40px; font-family: sans-serif; font-size: 12px; line-height: 18px; color: #666666; text-align: center; font-weight:normal;">' +
            '<p style="margin: 0;">'
            + '<a href="https://www.planck.biz/">👉 DESPLIEGA esta 🤯 APP tu MISMO 👈</a> </p>' +
            '<br>' +
            '<p style="margin: 0;">'
            + 'Copyright &copy; 2022-2023 <b>PLANCK</b>, Todos los derechos reservados.</p>' +
            '</td>' +
            '</tr>' +
            '</table>' +
            '</td>' +
            '</tr> ' +
            '</table>' +
            '</div>' +
            '</center>' +
            '</body>' +
            '</html>';
        const OAuth2 = googleapis_1.google.auth.OAuth2;
        const accountTransport = JSON.parse(process.env.ACCOUNT_TRANSPORT);
        this.emailLili = (callback) => {
            const oauth2Client = new OAuth2(accountTransport.auth.clientId, accountTransport.auth.clientSecret, "https://developers.google.com/oauthplayground");
            oauth2Client.setCredentials({ refresh_token: accountTransport.auth.refreshToken });
            oauth2Client.getAccessToken((error, token) => {
                if (error)
                    return this.logger.error(error);
                accountTransport.auth.accessToken = token;
                callback((0, nodemailer_1.createTransport)(accountTransport));
            });
        };
    }
    create(createEmailDto) {
        this.sendPassword('Juan Pablo', 'juanpa.desert@gmail.com', '1234');
        return 'This action adds a new email';
    }
    _transporter(callback) {
        const json = {
            app: 'LILI', from: 'LILI <lilik@planck.biz>',
            slogan: '😋 Comida exquisita, entregas simples. 🛵 Compra YA! 👇🏻',
            head: this.head, footer: this.footer
        };
        this.emailLili(function (transporter) {
            json['transporter'] = transporter;
            return callback(json);
        });
    }
    sendPassword(fullName, email, password) {
        this._transporter(function (sender) {
            sender['transporter'].sendMail({
                from: sender['from'],
                to: fullName + ' <' + email + '>',
                subject: password + ' es la contraseña de recuperación de tu cuenta ' + sender['app'],
                html: sender['head'] +
                    '<body width="100%" bgcolor="#F1F1F1" style="margin: 0; mso-line-height-rule: exactly;">' +
                    '<center style="width: 100%; background: #F1F1F1; text-align: left;"> ' +
                    '<div>' +
                    '<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;" >' +
                    '<tr> ' +
                    '<td bgcolor="#26a4d3" align="center" valign="top" style="text-align: center; background-position: center center !important; background-size: cover !important;">' +
                    '<div>' +
                    '<table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" width="100%" style="max-width:500px; margin: auto;">' +
                    '<tr>' +
                    '<td style="font-size:20px; ">&nbsp;</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td align="center" valign="middle">' +
                    '<table>' +
                    '<tr>' +
                    '<td valign="top" style="text-align: center;color: #FFFFFF;">' +
                    '<h1 style="margin: 0; font-family: "Montserrat", sans-serif; font-size: 30px; line-height: 36px; font-weight: bold; color: #00000;">'
                    + 'Querid@ ' + fullName + '</h1>' +
                    '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td valign="top" style="text-align: center; font-family: sans-serif; font-size: 15px; color: #00000;">' +
                    '<p style="margin: 0;">Se ha recuperado tu contraseña</p>' +
                    '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td valign="top" align="center" style="text-align: center;">' +
                    '<center>' +
                    '<table role="presentation" align="center" cellspacing="0" cellpadding="0" border="0" class="center-on-narrow" style="text-align: center;">' +
                    '<tr>' +
                    '<td style="border-radius: 50px; background: #26a4d3; text-align: center;" class="button-td">' +
                    '</td>' +
                    '</tr>' +
                    '</table>' +
                    '</center>' +
                    '</td>' +
                    '</tr> ' +
                    '</table>' +
                    '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td style="font-size:20px; ">&nbsp;</td>' +
                    '</tr>' +
                    '</table>' +
                    '</div>' +
                    '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td bgcolor="#ffffff">' +
                    '<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">' +
                    '<tr>' +
                    '<td style="padding: 40px 40px 20px 40px; text-align: left;">' +
                    '</td>' +
                    '</tr> ' +
                    '<tr>' +
                    '<td style="padding: 0px 40px 20px 40px; font-family: sans-serif; font-size: 20px; color: #555555; text-align: left; font-weight:normal;">' +
                    '<p style="margin: 0;">'
                    + 'Tu contraseña de acceso es:</p>' +
                    '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td align="left" style="padding: 0px 40px 40px 40px;">' +
                    '<table width="180" align="left">' +
                    '<tr>' +
                    '<td width="110"> ' +
                    '<table width="" cellpadding="0" cellspacing="0" border="0">' +
                    '<tr>' +
                    '<td align="left" style="font-family: sans-serif; font-size:22px;font-weight:bold;" class="body-text">' +
                    '<p style="font-family: "Montserrat", sans-serif; font-size:22px;font-weight:bold; padding:0; margin:0;" class="body-text">'
                    + password + '</p>' +
                    '</td>' +
                    '</tr>' +
                    '</table>' +
                    '</td> ' +
                    '</tr>' +
                    '</table>' +
                    '</td>' +
                    '</tr>' +
                    '</table>' +
                    '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td bgcolor="#26a4d3">' +
                    '<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">' +
                    '<tr>' +
                    '<td style="padding: 40px 40px 5px 40px; text-align: center;">' +
                    '<h3 style="margin: 0; font-family: "Montserrat", sans-serif; font-size: 20px; line-height: 24px; color: #00000; font-weight: bold;">'
                    + sender['slogan'] + '</h3>' +
                    '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td font-family: sans-serif; font-size: 17px; line-height: 23px; color: #00000; text-align: center; font-weight:normal;">' +
                    '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td valign="middle" align="center" style="text-align: center;">' +
                    '<table role="presentation" align="center" cellspacing="0" cellpadding="0" border="0" class="center-on-narrow">' +
                    '<tr>' +
                    '<td style="border-radius: 50px; background: #ffffff; text-align: center;" class="button-td">' +
                    '</td>' +
                    '</tr>' +
                    '</table>' +
                    '</td>' +
                    '</tr>' +
                    '</table>' +
                    '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td bgcolor="#ffffff">' +
                    '<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">' +
                    '<tr>' +
                    '<td style="padding: 30px 30px; text-align: center;">'
                    + sender['footer']
            }, function () {
            });
        });
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
//# sourceMappingURL=email.service.js.map