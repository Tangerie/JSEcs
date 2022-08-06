import { Vector2 } from "@core/Vector";
import { ComponentType, IComponent } from "@ecs/Component";

export default class Transform implements IComponent {
    static readonly ComponentType : ComponentType = Symbol("TransformComponent");

    position : Vector2;
    rotation : Vector2;
    
    velocity : Vector2 = Vector2.Zero;
    
    constructor(position : Vector2 = Vector2.Zero, rotation : Vector2 = Vector2.UnitFromAngle(0)) {
        this.position = position;
        this.rotation = rotation;
    }

    getComponentType() {
        return Transform.ComponentType;
    }
}