import { GenericEntity } from "./generic-entity.model";

export interface Notify extends GenericEntity {
    description: string;
    read: boolean;
    fileType: number;
}