/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CrudService } from '../../core/crud/crud.service';
import { Organization } from './organization.entity';
import { MikroOrmOrganizationRepository, TypeOrmOrganizationRepository } from './repository';

@Injectable()
export class OrganizationService extends CrudService<Organization> {

	constructor(
		readonly typeOrmOrganizationRepository: TypeOrmOrganizationRepository,
		readonly mikroOrmOrganizationRepository: MikroOrmOrganizationRepository
	) {
		super(typeOrmOrganizationRepository, mikroOrmOrganizationRepository);
	}
}
