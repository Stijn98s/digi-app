import {EntityStateModel} from './EntityStateModel';
import _ from 'lodash';


export abstract class EntityState<T extends { updatedAt: string, name: string  }> {


    latestUpdate(state: EntityStateModel<T>) {
        const start = new Date();
        start.setFullYear(1970, 1, 1);
        const entities = _.clone(state.entities);
        const organism = entities.sort((a, b) => {
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        })[0];
        return organism ? organism.updatedAt : start.toISOString();
    }



    extractModifications(state: EntityStateModel<T>) {
        return (res) => {
            const entities = [];
            entities.push(...state.entities);
            const newEntities = [];
            const deletedEntities = [];
            const editedEntities = [];
            res.filter(value => value.deleted === false).forEach((value) => {
                const entity = entities.find(value1 => value.name === value1.name);
                if (entity) {
                    const index = entities.indexOf(entity);
                    entities[index] = value;
                    editedEntities.push(entity);
                } else {
                    newEntities.push(value);
                }
            });

            res.filter(value => value.deleted === true)
                .forEach(value => {
                    const entity = entities.find(value1 => value1.name === value.name);
                    const index = entities.indexOf(entity);
                    if (index > -1) {
                        deletedEntities.push(entity);
                        entities.splice(index, 1);
                    }
                });

            entities.push(...newEntities);
            return {entities, newEntities, deletedEntities, editedEntities};
        };
    }

}
