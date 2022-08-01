import { Vector2 } from "src/core/Vector";
import { ComponentType, IComponent } from "src/ecs/Component";

export default class Transform implements IComponent {
    static readonly ComponentType : ComponentType = Symbol("TransformComponent");

    position : Vector2;
    constructor(position : Vector2 = Vector2.Zero) {
        this.position = position;
    }

    getComponentType() {
        return Transform.ComponentType;
    }
}