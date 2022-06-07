import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Ipoteka extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  bank: string;

  @property({
    type: 'string',
    required: true,
  })
  moneyDuty: string;

  @property({
    type: 'string',
    required: true,
  })
  lifeOrHouse: string;

  @property({
    type: 'string',
    required: true,
  })
  apartment: string;

  @property({
    type: 'string',
    required: true,
  })
  userName: string;

  @property({
    type: 'date',
    required: true,
  })
  dateBirth: string;

  @property({
    type: 'string',
    required: true,
  })
  phoneNumber: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Ipoteka>) {
    super(data);
  }
}

export interface IpotekaRelations {
  // describe navigational properties here
}

export type IpotekaWithRelations = Ipoteka & IpotekaRelations;
