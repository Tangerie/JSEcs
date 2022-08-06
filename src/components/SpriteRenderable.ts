import { Color } from "@core/Color";
import Sprite from "@core/Sprite";
import { Vector2 } from "@core/Vector";
import { ComponentType, IComponent } from "@ecs/Component";

export default class SpriteRenderable implements IComponent {
    static readonly ComponentType : ComponentType = Symbol("RenderableComponent");

    offset : Vector2;
    scale : Vector2;
    sprite : Sprite;

    constructor(
        offset : Vector2 = Vector2.Zero, 
        scale : Vector2 = Vector2.One,
        sprite : Sprite
    ) {

        this.offset = offset;
        this.scale = scale;
        this.sprite = sprite;
    }

    getComponentType() {
        return SpriteRenderable.ComponentType;
    }
}