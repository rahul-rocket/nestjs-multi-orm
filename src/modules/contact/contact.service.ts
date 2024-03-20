/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CrudService } from '../../core/crud/crud.service';
import { Contact } from './contact.entity';
import { TypeOrmContactRepository } from './repository/type-orm-contact.repository';
import { MikroOrmContactRepository } from './repository/mikro-orm-contact.repository';

@Injectable()
export class ContactService extends CrudService<Contact> {
    constructor(
        readonly typeOrmContactRepository: TypeOrmContactRepository,
        readonly mikroOrmContactRepository: MikroOrmContactRepository,
    ) {
        super(typeOrmContactRepository, mikroOrmContactRepository);
    }
}
