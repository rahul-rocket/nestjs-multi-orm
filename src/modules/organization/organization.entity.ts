/* eslint-disable prettier/prettier */
import { Index, RelationId } from 'typeorm';
import { EntityRepositoryType } from '@mikro-orm/core';
import { MultiORMColumn, MultiORMEntity, MultiORMManyToOne } from '../../core/decorators/entity';
import { TenantBaseEntity } from '../../core/entities/tenant-base.entity';
import { Contact } from '../contact/contact.entity';
import { MikroOrmOrganizationRepository } from './repository/mikro-orm-organization.repository';

@MultiORMEntity('organization', { mikroOrmRepository: () => MikroOrmOrganizationRepository })
export class Organization extends TenantBaseEntity {

	// to allow inference in `em.getRepository()`
	[EntityRepositoryType]?: MikroOrmOrganizationRepository;

	@MultiORMColumn()
	name: string;

	@MultiORMColumn('boolean', { default: false })
	isDefault: boolean;

	@MultiORMColumn({ nullable: true })
	profile_link: string;

	@MultiORMColumn({ nullable: true })
	banner: string;

	@MultiORMColumn({ nullable: true })
	totalEmployees: number;

	@MultiORMColumn({ nullable: true })
	short_description: string;

	@MultiORMColumn({ nullable: true })
	client_focus: string;

	@MultiORMColumn({ nullable: true })
	overview: string;

	@MultiORMColumn({ length: 500, nullable: true })
	imageUrl?: string;

	@MultiORMColumn()
	currency: string;

	@MultiORMColumn({ nullable: true })
	valueDate?: Date;

	@MultiORMColumn({ nullable: true })
	defaultAlignmentType?: string;

	@MultiORMColumn({ nullable: true })
	timeZone?: string;

	@MultiORMColumn({ nullable: true })
	regionCode?: string;

	@MultiORMColumn({ nullable: true })
	brandColor?: string;

	@MultiORMColumn({ nullable: true })
	dateFormat?: string;

	@MultiORMColumn({ nullable: true })
	officialName?: string;

	@MultiORMColumn({ nullable: true })
	taxId?: string;

	@MultiORMColumn({ nullable: true })
	numberFormat?: string;

	@MultiORMColumn({ nullable: true })
	minimumProjectSize?: string;

	@MultiORMColumn({ nullable: true })
	bonusType?: string;

	@MultiORMColumn({ nullable: true })
	bonusPercentage?: number;

	@MultiORMColumn({ nullable: true, default: true })
	invitesAllowed?: boolean;

	@MultiORMColumn({ nullable: true })
	show_income?: boolean;

	@MultiORMColumn({ nullable: true })
	show_profits?: boolean;

	@MultiORMColumn({ nullable: true })
	show_bonuses_paid?: boolean;

	@MultiORMColumn({ nullable: true })
	show_total_hours?: boolean;

	@MultiORMColumn({ nullable: true })
	show_minimum_project_size?: boolean;

	@MultiORMColumn({ nullable: true })
	show_projects_count?: boolean;

	@MultiORMColumn({ nullable: true })
	show_clients_count?: boolean;

	@MultiORMColumn({ nullable: true })
	show_clients?: boolean;

	@MultiORMColumn({ nullable: true })
	show_employees_count?: boolean;

	@MultiORMColumn({ nullable: true })
	inviteExpiryPeriod?: number;

	@MultiORMColumn({ nullable: true })
	fiscalStartDate?: Date;

	@MultiORMColumn({ nullable: true })
	fiscalEndDate?: Date;

	@MultiORMColumn({ nullable: true })
	registrationDate?: Date;

	@MultiORMColumn({ nullable: true })
	futureDateAllowed?: boolean;

	/**
	 * Indicates whether manual time entry is allowed for time tracking.
	 *
	 * @column
	 * @default true
	 * @type boolean
	 */
	@MultiORMColumn({ default: true })
	allowManualTime?: boolean;

	/**
	 * Indicates whether modification of time entries is allowed for time tracking.
	 *
	 * @column
	 * @default true
	 * @type boolean
	 */
	@MultiORMColumn({ default: true })
	allowModifyTime?: boolean;

	/**
	 * Indicates whether deletion of time entries is allowed for time tracking.
	 *
	 * @column
	 * @default true
	 * @type boolean
	 */
	@MultiORMColumn({ default: true })
	allowDeleteTime?: boolean;

	@MultiORMColumn({ default: true })
	allowTrackInactivity?: boolean;

	@MultiORMColumn({ default: 10 })
	inactivityTimeLimit?: number;

	@MultiORMColumn({ default: 1 })
	activityProofDuration?: number;

	@MultiORMColumn({ default: false })
	requireReason?: boolean;

	@MultiORMColumn({ default: false })
	requireDescription?: boolean;

	@MultiORMColumn({ default: false })
	requireProject?: boolean;

	@MultiORMColumn({ default: false })
	requireTask?: boolean;

	@MultiORMColumn({ default: false })
	requireClient?: boolean;

	@MultiORMColumn({ default: 12 })
	timeFormat?: 12 | 24;

	@MultiORMColumn({ nullable: true })
	separateInvoiceItemTaxAndDiscount?: boolean;

	@MultiORMColumn({ nullable: true })
	website?: string;

	@MultiORMColumn({ nullable: true })
	fiscalInformation?: string;

	@MultiORMColumn({ nullable: true })
	discountAfterTax?: boolean;

	@MultiORMColumn({ nullable: true })
	defaultStartTime?: string;

	@MultiORMColumn({ nullable: true })
	defaultEndTime?: string;

	@MultiORMColumn({ nullable: true })
	defaultInvoiceEstimateTerms?: string;

	@MultiORMColumn({ nullable: true })
	convertAcceptedEstimates?: boolean;

	@MultiORMColumn({ nullable: true })
	daysUntilDue?: number;

	@MultiORMColumn({ default: false })
	isRemoveIdleTime?: boolean;

	@MultiORMColumn({ default: true })
	allowScreenshotCapture?: boolean;

	/** Upwork Organization ID */
	@MultiORMColumn({ nullable: true })
	upworkOrganizationId?: string;

	/** Upwork Organization Name */
	@MultiORMColumn({ nullable: true })
	upworkOrganizationName?: string;

	/**
	 * Indicates whether random screenshots are enabled. Defaults to false if not provided.
	 */
	@MultiORMColumn({ nullable: true, default: false })
	randomScreenshot?: boolean;

	/**
	 * Indicates whether tracking is enabled during sleep.
	 */
	@MultiORMColumn({ nullable: true, default: false })
	trackOnSleep?: boolean;

	/**
	 * Specifies the frequency of capturing screenshots. Defaults to 10 if not provided.
	 */
	@MultiORMColumn({ type: 'numeric', default: 10 })
	screenshotFrequency?: number;

	/**
	 * Indicates whether a certain rule or behavior is enforced. Defaults to false if not provided.
	 */
	@MultiORMColumn({ nullable: true, default: false })
	enforced?: boolean;

	/*
	|--------------------------------------------------------------------------
	| @ManyToOne
	|--------------------------------------------------------------------------
	*/

	// Contact
	// @MultiORMManyToOne(() => Contact, (contact) => contact.organization, {
	// 	/** Indicates if the relation column value can be nullable or not. */
	// 	nullable: true,

	// 	onDelete: 'SET NULL'
	// })
	// contact: Contact;

	// @RelationId((it: Organization) => it.contact)
	// @Index()
	// @MultiORMColumn({ nullable: true, relationId: true })
	// contactId?: string;
}
