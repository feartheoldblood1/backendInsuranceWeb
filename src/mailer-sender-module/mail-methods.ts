import {Options} from '@loopback/repository';
import {transporter} from "./mail-config";
export let mailer: any = (message: Options) => {
  transporter.sendMail(message, (err: any, info: any) => {
    if (err) return console.log(err)
    console.log('Email sent: ', info)
  });
}
