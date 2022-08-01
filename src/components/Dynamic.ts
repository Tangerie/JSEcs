import { ComponentType, IComponent } from "@ecs/Component";
import { Vector2 } from "src/core/Vector";

interface DynamicConstructor {
    velocity : Vector2;
    mass : number;
    gravity : boolean;
    resistance : number;
}

export default class Dynamic implements IComponent {
    static readonly ComponentType : ComponentType = Symbol("DynamicComponent");

    velocity : Vector2 = Vector2.Zero;
    mass : number = 1;
    gravity : boolean = true;
    resistance : number = 1;

    constructor(args? : Partial<DynamicConstructor>) {
        Object.assign(this, args);
    }

    getComponentType() {
        return Dynamic.ComponentType;
    }
}