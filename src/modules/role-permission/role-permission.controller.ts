/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { RolePermissionService } from './role-permission.service';

@Controller('roles/permission')
export class RolePermissionController {

	constructor(
		readonly _rolePermissionService: RolePermissionService
	) { }

	@Get()
	async findAll() {
		return await this._rolePermissionService.findAll();
	}
}