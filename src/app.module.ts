/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TransformInterceptor } from './core/interceptors';
import { TenantModule } from './modules/tenant/tenant.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { RoleModule } from './modules/role/role.module';
import { RolePermissionModule } from './modules/role-permission/role-permission.module';
import { UserModule } from './modules/user/user.module';
import { ContactModule } from './modules/contact/contact.module';
import { TagModule } from './modules/tag/tag.module';

@Module({
	imports: [
		DatabaseModule,
		TenantModule,
		OrganizationModule,
		RoleModule,
		RolePermissionModule,
		UserModule,
		ContactModule,
		TagModule
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_INTERCEPTOR,
			useClass: TransformInterceptor,
		},
	],
})
export class AppModule { }
