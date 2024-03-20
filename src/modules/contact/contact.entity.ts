/* eslint-disable prettier/prettier */
import { Index, RelationId } from "typeorm";
import { EntityRepositoryType } from "@mikro-orm/core";
import { MultiORMColumn, MultiORMEntity, MultiORMManyToOne } from "../../core/decorators/entity";
import { TenantOrganizationBaseEntity } from "../../core/entities/tenant-organization-base.entity";
import { Organization } from "../../core/entities/internal";
import { MikroOrmContactRepository } from "./repository/mikro-orm-contact.repository";

@MultiORMEntity('contact', { mikroOrmRepository: () => MikroOrmContactRepository })
export class Contact extends TenantOrganizationBaseEntity {

	// to allow inference in `em.getRepository()`
	[EntityRepositoryType]?: MikroOrmContactRepository;

	@MultiORMColumn({ nullable: true })
	name?: string;

	@MultiORMColumn({ nullable: true })
	firstName?: string;

	@MultiORMColumn({ nullable: true })
	lastName?: string;

	@MultiORMColumn({ nullable: true })
	country?: string;

	@MultiORMColumn({ nullable: true })
	city?: string;

	@MultiORMColumn({ nullable: true })
	address?: string;

	@MultiORMColumn({ nullable: true })
	address2?: string;

	@MultiORMColumn({ nullable: true })
	postcode?: string;

	@MultiORMColumn({
		nullable: true,
		type: 'numeric'
	})
	latitude?: number;

	@MultiORMColumn({
		nullable: true,
		type: 'numeric'
	})
	longitude?: number;

	@MultiORMColumn({ nullable: true })
	regionCode?: string;

	@MultiORMColumn({ nullable: true })
	fax?: string;

	@MultiORMColumn({ nullable: true })
	fiscalInformation?: string;

	@MultiORMColumn({ nullable: true })
	website?: string;

	/*
	|--------------------------------------------------------------------------
	| @OneToOne
	|--------------------------------------------------------------------------
	*/
}
