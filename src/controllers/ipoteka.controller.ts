// Uncomment these imports to begin using these cool features!

import {getModelSchemaRef, param, post, response} from '@loopback/rest';
// import {inject} from '@loopback/core';
import * as nodemailer from 'nodemailer';
import {Options} from 'nodemailer/lib/smtp-transport';
import {Ipoteka} from '../models';
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: 'jessika.bode71@ethereal.email',
    pass: 'eP7pH9fS2Hb7WHRbVd'
  }
});

let mailer: any = (message: Options) => {
  transporter.sendMail(message, (err: any, info: any) => {
    if (err) return console.log(err)
    console.log('Email sent: ', info)
  });
}

export class IpotekaController {
  constructor() {

  }


  @post('/ipoteka/{email}/{name}/{phoneNumber}')
  @response(200, {
    description: 'Ipoteka model instance',
    content: {'application/json': {schema: getModelSchemaRef(Ipoteka)}},
  })
  async sendMsgToMail(
    @param.path.string('email') email: string,
    @param.path.string('name') name: string,
    @param.path.string('phoneNumber') phoneNumber: string,
  ): Promise<void> {
    let message = {
      from: "Mailer Test <jessika.bode71@ethereal.email>",
      to: email,
      subject: 'Congratulations',
      text: `Поздравляем, вы успешно зарегистрировались на нашем сайте
      email: ${email}
      name: ${name}
      phone: ${phoneNumber}
      `
    }
    mailer(message);
  }
}

