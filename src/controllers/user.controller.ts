import {
  Count,
  CountSchema,
  DateType,
  Filter, FilterExcludingWhere, repository, Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {SHA256} from 'crypto-js';
import {User} from '../models';
import {UserRepository} from '../repositories';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @post('/users/{mail}/{phone_number}/{password}/{surname}/{name}/{otchestvo}/{datebirth}/{foreigner}/{document}/{document_number}/{document_series}')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @param.path.string('mail') p_mail: string,
    @param.path.string('phone_number') p_phone_number: string,
    @param.path.password('password') p_password: string,
    @param.path.string('surname') p_surname: string,
    @param.path.string('name') p_name: string,
    @param.path.string('otchestvo') p_otchestvo: string,
    @param.path.date('datebirth') p_datebirth: DateType,
    @param.path.string('foreigner') p_foreigner: string,
    @param.path.string('document') p_document: string,
    @param.path.string('document_number') p_document_number: string,
    @param.path.string('document_series') p_document_series: string,
  ): Promise<Omit<User, 'id'>> {

    let newUser = new User();

    newUser.mail = p_mail;
    newUser.phone_number = p_phone_number;
    let hashPassword: string = SHA256(p_password).toString();
    newUser.password = hashPassword;
    newUser.surname = p_surname;
    newUser.name = p_name;
    newUser.otchestvo = p_otchestvo;
    newUser.datebirth = p_datebirth.toString();
    newUser.foreigner = p_foreigner;
    newUser.document = p_document;
    newUser.document_number = p_document_number;
    newUser.document_series = p_document_series;
    return this.userRepository.create(newUser);
  }
  // @get('/users/{email}/')
  // @response(200, {
  //   description: 'Array of User model instances',
  //   content: {
  //     'application/json': {
  //       schema: {
  //         items: getModelSchemaRef(User, {includeRelations: true}),
  //       },
  //     },
  //   },
  // })
  // async findByEmail(
  //   @param.path.string('email') email: string,

  // ): Promise<boolean | undefined> {
  //   const filter = {
  //     where: {mail: email},
  //   };

  //   let user = await this.userRepository.find(filter);

  //   if (user === []) {
  //     return false;
  //   }
  //   else if (user[0].mail == email) {
  //     return true;
  //   }

  // }


  // @get('/users/{phone_number}')
  // @response(200, {
  //   description: 'Array of User model instances',
  //   content: {
  //     'application/json': {
  //       schema: {

  //         items: getModelSchemaRef(User, {includeRelations: true}),
  //       },
  //     },
  //   },
  // })
  // async findByPhone(
  //   @param.path.password('phone_number') phone_number: string,
  // ): Promise<boolean> {
  //   const filter = {
  //     where: {phone_number: phone_number},

  //   }
  //   let user: User[] = [];
  //   user = await this.userRepository.find(filter);
  //   if (user[0].phone_number == phone_number) {
  //     return true;
  //   }

  //   return false;
  // }

  @get('/users/{email}/{password}')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async findByNamePass(
    @param.path.string('email') email: string,
    @param.path.password('password') password: string,
  ): Promise<User | undefined> {
    const filter: Filter = {
      where: {mail: email},
      fields: {
        password: true, mail: true, phone_number: true, datebirth: true
        , surname: true, name: true, otchestvo: true, id: true
      }
    }

    let userData: User[] = await this.userRepository.find(filter);
    let hash: string = SHA256(password).toString();
    if (hash == userData[0].password) {
      return userData[0]
    }
    else if (hash != userData[0].password) {
      return undefined
    }
  }
  @get('/users/count')
  @response(200, {
    description: 'User model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.count(where);
  }

  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @patch('/users')
  @response(200, {
    description: 'User PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  @get('/users/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @patch('/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @put('/users/{id}')
  @response(204, {
    description: 'User PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del('/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
