/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contacts')
export class ContactController {

    constructor(
        private readonly _contactService: ContactService
    ) { }
}
