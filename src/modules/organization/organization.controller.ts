/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { OrganizationService } from './organization.service';

@Controller('organizations')
export class OrganizationController {

	constructor(
		readonly _organizationService: OrganizationService
	) { }
}
