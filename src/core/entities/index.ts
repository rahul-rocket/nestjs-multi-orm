/* eslint-disable prettier/prettier */
import {
	Tenant,
	Organization,
	Role,
	RolePermission,
	User,
	Profile,
	Contact,
} from './internal';
import { RoleSubscriber } from './subscribers';

export const coreEntities = [
	Tenant,
	Organization,
	Role,
	RolePermission,
	User,
	Profile,
	Contact
];

export const coreSubscribers = [
	RoleSubscriber
];
