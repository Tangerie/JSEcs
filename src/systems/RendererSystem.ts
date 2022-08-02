import Renderable from "@components/Renderable";
import Transform from "@components/Transform";
import ISystem, { SystemArchetype } from "@ecs/System";
import World from "@ecs/World";
import { Color } from "src/core/Color";
import { Vector2 } from "src/core/Vector";

export default class RendererSystem implements ISystem {
    private static archetype : SystemArchetype = [
        Transform.ComponentType,
        Renderable.ComponentType
    ];

    ctxt : CanvasRenderingContext2D;

    constructor(ctxt : CanvasRenderingContext2D) {
        this.ctxt = ctxt;
    }

    getArchetype() {
        return RendererSystem.archetype;
    }

    run(world : World, transform : Transform, render : Renderable) {
        this.ctxt.fillStyle = render.color.toString();
        const position = Vector2.Add(transform.position, render.offset);
        this.ctxt.fillRect(position.x, position.y, render.scale.x, render.scale.y);
    }
}