// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
// Uncomment these imports to begin using these cool features!

import {getModelSchemaRef, param, post, response} from '@loopback/rest';
import {mailer} from '../mailer-sender-module/mail-methods';
import {Ipoteka} from '../models';
// import {inject} from '@loopback/core';



export class JourneyController {
  constructor() { }



  @post('/journey/{countries}/{dateStart}/{dateEnd}/{ageRange}/{citezenship}/{email}')
  @response(200, {
    description: 'Ipoteka model instance',
    content: {'application/json': {schema: getModelSchemaRef(Ipoteka)}},
  })
  async sendMsgToMail(
    @param.path.string('countries') countries: string,
    @param.path.string('dateStart') dateStart: string,
    @param.path.string('dateEnd') dateEnd: string,
    @param.path.string('ageRange') ageRange: string,
    @param.path.string('citezenship') citezenship: string,
    @param.path.string('email') email: string,

  ): Promise<void> {
    let message = {
      from: "Проект 'Страхование' <p_lobachev@inbox.ru>",
      to: "p_lobachev@inbox.ru",
      subject: 'Оформление страхового полиса на путешествие',
      text: `Пришла заявка на покупку полиса на путешестивие
    Данные о поездке:
    Почта: ${email}
    Страны: ${countries}
    Начало поездки: ${dateStart}
    Конец поездки: ${dateEnd}
    Диапазон: ${ageRange}
    Гражданство: ${citezenship}
  `
    }
    mailer(message);
  }
}
