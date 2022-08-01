import { Color } from "src/core/Color";
import { Vector2 } from "src/core/Vector";
import { ComponentType, IComponent } from "src/ecs/Component";

export default class Renderable implements IComponent {
    static readonly ComponentType : ComponentType = Symbol("RenderableComponent");

    offset : Vector2;
    scale : Vector2;
    color : Color;

    constructor(
        offset : Vector2 = Vector2.Zero, 
        scale : Vector2 = Vector2.One,
        color : Color = Color.White
    ) {

        this.offset = offset;
        this.scale = scale;
        this.color = color
    }

    getComponentType() {
        return Renderable.ComponentType;
    }
}