/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { OrganizationController } from './organization.controller';
import { Organization } from './organization.entity';
import { OrganizationService } from './organization.service';
import { TypeOrmOrganizationRepository } from './repository';
// import { ContactModule } from '../contact/contact.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Organization]),
		MikroOrmModule.forFeature([Organization]),
		// ContactModule
	],
	controllers: [OrganizationController],
	providers: [
		OrganizationService,
		TypeOrmOrganizationRepository
	],
	exports: [
		TypeOrmModule,
		MikroOrmModule,
		OrganizationService,
		TypeOrmOrganizationRepository
	]
})
export class OrganizationModule { }
