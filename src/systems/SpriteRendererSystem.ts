import SpriteRenderable from "@components/SpriteRenderable";
import Transform from "@components/Transform";
import { drawRelativeTo } from "@core/CanvasUtility";
import { Vector2 } from "@core/Vector";
import ISystem, { SystemArchetype } from "@ecs/System";
import GameWorld from "game/GameWorld";

export default class SpriteRendererSystem implements ISystem {
    private static archetype : SystemArchetype = [
        Transform.ComponentType,
        SpriteRenderable.ComponentType
    ];

    getArchetype() {
        return SpriteRendererSystem.archetype;
    }

    run(world : GameWorld, transform : Transform, render : SpriteRenderable) {
        const ctxt = world.context;

        drawRelativeTo(ctxt, transform.position, transform.rotation.angle + render.sprite.rotation, world.zoom, () => {
            ctxt.drawImage(render.sprite.image, 
                render.offset.x - 0.5 * render.sprite.width, 
                render.offset.y - 0.5 * render.sprite.height, 
                render.sprite.width * render.scale.x, 
                render.sprite.height * render.scale.y
            );
        });
    }

}