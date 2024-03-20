/* eslint-disable prettier/prettier */
import { Index, RelationId } from "typeorm";
import { MultiORMColumn, MultiORMManyToOne } from "../decorators/entity";
import { BaseEntity } from "./base.entity";
import { Tenant } from "./internal";

export abstract class TenantBaseEntity extends BaseEntity {

	@MultiORMManyToOne(() => Tenant, {
		/** Indicates if relation column value can be nullable or not. */
		nullable: true,

		/** Database cascade action on delete. */
		onDelete: 'CASCADE'
	})
	tenant?: Tenant;

	@RelationId((t: TenantBaseEntity) => t.tenant)
	@Index()
	@MultiORMColumn({ nullable: true, relationId: true })
	tenantId?: Tenant['id'];
}
