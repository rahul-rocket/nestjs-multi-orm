/* eslint-disable prettier/prettier */
import { TenantBaseEntity } from '../../core/entities/tenant-base.entity';
import { User } from '../../core/entities/internal';
import { MultiORMColumn, MultiORMEntity, MultiORMOneToOne } from '../../core/decorators/entity';
import { MikroOrmProfileRepository } from './repository/mikro-orm-profile.repository';
import { RelationId } from 'typeorm';

@MultiORMEntity('profile', { mikroOrmRepository: () => MikroOrmProfileRepository })
export class Profile extends TenantBaseEntity {

    @MultiORMColumn({ nullable: true })
    bio?: string;

    /*
    |--------------------------------------------------------------------------
    | @OneToOne
    |--------------------------------------------------------------------------
    */
    // Profile is the inverse side of the relationship
    @MultiORMOneToOne(() => User, (user) => user.profile, {
        /** Indicates if relation column value can be nullable or not. */
        nullable: true,

        /** Database cascade action on delete. */
        onDelete: 'CASCADE',

        /** This column is a boolean flag indicating that this is the inverse side of the relationship, and it doesn't control the foreign key directly  */
        owner: false
    })
    user?: User;

    @RelationId((it: Profile) => it.user)
    @MultiORMColumn({ nullable: true, relationId: true })
    userId?: string;
}