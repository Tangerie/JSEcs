import Collider from "@components/Collider";
import Dynamic from "@components/Dynamic";
import Transform from "@components/Transform";
import System, { SystemArchetype } from "@ecs/System";
import World from "@ecs/World";
import { Vector2 } from "src/core/Vector";

export default class BounceSystem implements System {
    private static archetype : SystemArchetype = [
        Transform.ComponentType,
        Dynamic.ComponentType,
        Collider.ComponentType
    ];

    canvas : HTMLCanvasElement;

    constructor(canvas : HTMLCanvasElement) {
        this.canvas = canvas;
    }

    getArchetype() {
        return BounceSystem.archetype;
    }

    run(world : World, transform : Transform, dyn : Dynamic, col : Collider) {
        const topLeft = Vector2.Add(col.bounds.tl, transform.position);
        const bottomRight = Vector2.Add(col.bounds.br, transform.position);

        const width = this.canvas.width;
        const height = this.canvas.height;

        if(topLeft.x < 0 || bottomRight.x > width) {
            dyn.velocity.x *= -1;
        }

        if(topLeft.y < 0 || bottomRight.y > height) {
            dyn.velocity.y *= -1;
        }
    }
}