// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';


// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';



// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
// Uncomment these imports to begin using these cool features!

import {getModelSchemaRef, param, post, response} from '@loopback/rest';
import {mailer} from '../mailer-sender-module/mail-methods';
import {Ipoteka} from '../models';
// import {inject} from '@loopback/core';



export class OsagoController {
  constructor() { }



  @post('/osago/{registrAddress}/{markaCar}/{markaModelClass}/{dateCar}/{engineCapacity}/{carPlace}/{name}/{phone}')
  @response(200, {
    description: 'Ipoteka model instance',
    content: {'application/json': {schema: getModelSchemaRef(Ipoteka)}},
  })
  async sendMsgToMail(
    @param.path.string('registrAddress') registrAddress: string,
    @param.path.string('markaCar') markaCar: string,
    @param.path.string('markaModelClass') markaModelClass: string,
    @param.path.string('dateCar') dateCar: string,
    @param.path.string('engineCapacity') engineCapacity: string,
    @param.path.string('carPlace') carPlace: string,
    @param.path.string('name') name: string,
    @param.path.string('phone') phone: string,


  ): Promise<void> {
    let message = {
      from: "Проект 'Страхование' <p_lobachev@inbox.ru>",
      to: "p_lobachev@inbox.ru",
      subject: 'Оформление страхового полиса ОСАГО',
      text: `Пришла заявка на покупку полиса ОСАГО
    Данные страхователя лица:
    Имя: ${name}
    Номер телефона: ${phone}
    Адрес собственника: ${registrAddress}
    Данные о транспортном средстве:
    Марка автомобиля: ${markaCar}
    Модель и класс автомобиля: ${markaModelClass}
    Год выпуска: ${dateCar}
    Объем двигателя: ${engineCapacity}
    Место использования автомобиля: ${carPlace}
    `
    }
    mailer(message);
  }
}

