/* eslint-disable prettier/prettier */
import { TenantBaseEntity } from '../../core/entities/tenant-base.entity';
import { User } from '../../core/entities/internal';
import { MultiORMColumn, MultiORMEntity } from '../../core/decorators/entity';
import { MikroOrmProfileRepository } from './repository/mikro-orm-profile.repository';
import { MikroOrmOneToOne } from '../../core/decorators/entity/relations/mikro-orm';
import { TypeOrmOneToOne } from '../../core/decorators/entity/relations/type-orm';

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
    @TypeOrmOneToOne(() => User, (user) => user.profile, {
        onDelete: 'CASCADE'
    })
    @MikroOrmOneToOne(() => User, (user) => user.profile, {
        owner: false,
        deleteRule: 'cascade',
        mappedBy: (user) => user.profile
    })
    user!: User;
}