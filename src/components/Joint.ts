import { ComponentType, IComponent } from "@ecs/Component";
import { Entity } from "@ecs/Entity";


export default class Joint implements IComponent {
    static readonly ComponentType : ComponentType = Symbol("JointComponent");

    other : Entity;

    constructor(other : Entity) {
        this.other = other;
    }

    getComponentType() {
        return Joint.ComponentType;
    }
}