/* eslint-disable prettier/prettier */
import { EntityName, EventArgs, EventSubscriber as MikroEntitySubscriberInterface } from '@mikro-orm/core';
import { EventSubscriber, RemoveEvent, EntitySubscriberInterface as TypeOrmEntitySubscriberInterface } from 'typeorm';
import { Role } from "./role.entity";

@EventSubscriber()
export class RoleSubscriber implements MikroEntitySubscriberInterface<Role>, TypeOrmEntitySubscriberInterface<Role> {

    /**
    * Indicates that this subscriber only listen to User events.
    */
    listenTo() {
        return Role;
    }

    /**
     * Returns the array of entities this subscriber is subscribed to.
     * If listenTo is not defined, it returns an empty array.
     *
     * @returns {EntityName<Role>[]} An array containing the entities to which this subscriber listens.
     */
    getSubscribedEntities(): EntityName<Role>[] {
        if (this.listenTo()) {
            return [this.listenTo()];
        }
        return [];
    }

    /**
     * Invoked when an entity is deleted in MikroORM.
     *
     * @param args The details of the delete event, including the deleted entity.
     * @returns {void | Promise<any>} Can perform asynchronous operations.
     */
    async afterDelete(args: EventArgs<Role>): Promise<void> {
        try {
            console.log(args.em, 'afterDelete');
        } catch (error) {
            console.error("Error in afterDelete:", error);
        }
    }

    /**
     * Invoked when an entity is removed in TypeORM.
     *
     * @param event The remove event details, including the removed entity.
     * @returns {Promise<void>} Can perform asynchronous operations.
     */
    async afterRemove(event: RemoveEvent<Role>): Promise<void> {
        try {
            console.log(event.entity, 'afterRemove');
        } catch (error) {
            console.error("Error in afterRemove:", error);
        }
    }
}
