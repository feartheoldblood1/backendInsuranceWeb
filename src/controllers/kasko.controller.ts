// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';



// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
// Uncomment these imports to begin using these cool features!

import {getModelSchemaRef, param, post, response} from '@loopback/rest';
import {mailer} from '../mailer-sender-module/mail-methods';
import {Ipoteka} from '../models';
// import {inject} from '@loopback/core';



export class KaskoController {
  constructor() { }



  @post('/kasko/{registrAddress}/{markaCar}/{markaModelClass}/{dateCar}/{engineCapacity}/{bank}/{carCost}/{carPlace}/{userData}/{name}/{phone}')
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
    @param.path.string('bank') bank: string,
    @param.path.string('carCost') carCost: string,
    @param.path.string('carPlace') carPlace: string,
    @param.path.string('userData') userData: string,
    @param.path.string('name') name: string,
    @param.path.string('phone') phone: string,


  ): Promise<void> {
    let message = {
      from: "Проект 'Страхование' <p_lobachev@inbox.ru>",
      to: "p_lobachev@inbox.ru",
      subject: 'Оформление страхового полиса КАСКО',
      text: `Пришла заявка на покупку полиса КАСКО
    Данные страхователя лица:
    Имя: ${name}
    Номер телефона: ${phone}
    Адрес собственника: ${registrAddress}
    Данные о транспортном средстве:
    Марка автомобиля: ${markaCar}
    Модель и класс автомобиля: ${markaModelClass}
    Год выпуска: ${dateCar}
    Объем двигателя: ${engineCapacity}
    Цена автомобилья: ${carCost}
    Банк кредитор: ${bank}
    Место использования автомобиля: ${carPlace}
    Количество водителей ${userData}

    `
    }
    mailer(message);
  }
}

