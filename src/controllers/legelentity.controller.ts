// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
// Uncomment these imports to begin using these cool features!

import {getModelSchemaRef, param, post, response} from '@loopback/rest';
import {mailer} from '../mailer-sender-module/mail-methods';
import {Ipoteka} from '../models';
// import {inject} from '@loopback/core';



export class LegelentityController {
  constructor() { }



  @post('/journey/{companyName}/{addres}/{INN}/{region}/{surname}/{name}/{otchestvo}/{email}/{phone}')
  @response(200, {
    description: 'Ipoteka model instance',
    content: {'application/json': {schema: getModelSchemaRef(Ipoteka)}},
  })
  async sendMsgToMail(
    @param.path.string('companyName') companyName: string,
    @param.path.string('addres') addres: string,
    @param.path.string('INN') INN: string,
    @param.path.string('region') region: string,
    @param.path.string('surname') surname: string,
    @param.path.string('name') name: string,
    @param.path.string('otchestvo') otchestvo: string,
    @param.path.string('email') email: string,
    @param.path.string('phone') phone: string,

  ): Promise<void> {
    let message = {
      from: "Проект 'Страхование' <p_lobachev@inbox.ru>",
      to: "p_lobachev@inbox.ru",
      subject: 'Оформление страхового полиса на имущество для юридических лиц',
      text: `Пришла заявка на покупку полиса на имущество для юридических лиц
    Данные юридического лица:
    Почта: ${email}
    Номер телефона: ${phone}
    Фамилия: ${surname}
    Имя: ${name}
    Отчество: ${otchestvo}
    Название компании: ${companyName}
    Адрес: ${addres}
    ИНН: ${INN}
    Регион: ${region}
  `
    }
    mailer(message);
  }
}

