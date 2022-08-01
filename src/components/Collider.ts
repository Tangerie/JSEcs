import { ComponentType, IComponent } from "@ecs/Component";
import { AABB } from "src/core/AABB";

interface ColliderConstructor {
    bounds : AABB;
}

export default class Collider implements IComponent {
    static readonly ComponentType : ComponentType = Symbol("ColliderComponent");

    bounds : AABB = new AABB();

    constructor(args? : Partial<ColliderConstructor>) {
        Object.assign(this, args);
    }

    getComponentType() {
        return Collider.ComponentType;
    }
}