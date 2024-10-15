import { GenericEntity } from "./generic-entity.model";

export interface NotifyEntity extends GenericEntity {
    description: string;
    read: boolean;
    fileType: number;
}