// Uncomment these imports to begin using these cool features!

import {getModelSchemaRef, param, post, response} from '@loopback/rest';
import {mailer} from '../mailer-sender-module/mail-methods';
// import {inject} from '@loopback/core';
import {Ipoteka} from '../models';
export class IpotekaController {
  constructor() {

  }


  @post('/ipoteka/{bank}/{remains}/{insuranceObject}/{propertyHouse}/{name}/{dateBirth}/{phoneNumber}/{email}/')
  @response(200, {
    description: 'Ipoteka model instance',
    content: {'application/json': {schema: getModelSchemaRef(Ipoteka)}},
  })
  async sendMsgToMail(
    @param.path.string('bank') bank: string,
    @param.path.string('remains') remains: string,
    @param.path.string('insuranceObject') insuranceObject: string,
    @param.path.string('propertyHouse') propertyHouse: string,
    @param.path.string('name') name: string,
    @param.path.string('dateBirth') dateBirth: string,
    @param.path.string('phoneNumber') phoneNumber: string,
    @param.path.string('email') email: string,
  ): Promise<void> {
    let message = {
      from: "Проект 'Страхование' <p_lobachev@inbox.ru>",
      to: "p_lobachev@inbox.ru",
      subject: 'Оформление страхового полиса на ипотеку',
      text: `Пришла заявка на покупку полиса на ипотеку
      Данные клиента:
      Имя: ${name}
      Почта: ${email}
      Номер телефона: ${phoneNumber}
      Дата рождения: ${dateBirth}
      Банк кредитор: ${bank}
      Остаток долга (руб): ${remains}
      Объект страхования: ${insuranceObject}
      Имущество в ипотеке: ${propertyHouse}
    `
    }
    mailer(message);
  }
}

