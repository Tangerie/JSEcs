import Component, { ComponentType, IComponent } from "./Component";
import World from "./World";

type ComponentInitializer = () => IComponent;

export default class EntityFactory {
    private readonly _inits : ComponentInitializer[];

    constructor(...components : ComponentInitializer[]) {
        this._inits = components;
    }

    instantiate(world : World) {
        const entity = world.entities.createEntity();
        for(const c of this._inits) {
            world.components.addComponent(entity, c());
        }
        return entity;
    }
}