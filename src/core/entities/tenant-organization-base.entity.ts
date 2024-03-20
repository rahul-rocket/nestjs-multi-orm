/* eslint-disable prettier/prettier */

import { Index, RelationId } from "typeorm";
import { MultiORMColumn, MultiORMManyToOne } from "../decorators/entity";
import { TenantBaseEntity } from "./tenant-base.entity";
import { Organization } from "./internal";

export abstract class TenantOrganizationBaseEntity extends TenantBaseEntity {

	@MultiORMManyToOne(() => Organization, {
		/** Indicates if relation column value can be nullable or not. */
		nullable: true
	})
	organization?: Organization;

	@RelationId((it: TenantOrganizationBaseEntity) => it.organization)
	@Index()
	@MultiORMColumn({ nullable: true, relationId: true })
	organizationId?: string;
}
