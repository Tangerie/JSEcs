import Collider from "@components/Collider";
import Dynamic from "@components/Dynamic";
import Transform from "@components/Transform";
import ISystem, { SystemArchetype } from "@ecs/System";
import World from "@ecs/World";
import { Vector2 } from "src/core/Vector";

export default class GravitySystem implements ISystem {
    private static archetype : SystemArchetype = [
        Dynamic.ComponentType,
    ];

    getArchetype() {
        return GravitySystem.archetype;
    }

    run(world : World, dyn : Dynamic) {
        if(dyn.gravity) {
            dyn.velocity.y += 120 * world.delta;
        }
    }
}