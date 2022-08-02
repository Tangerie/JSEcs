import Dynamic from "@components/Dynamic";
import Transform from "@components/Transform";
import ISystem, { SystemArchetype } from "@ecs/System";
import World from "@ecs/World";
import { Vector2 } from "src/core/Vector";

export default class DynamicsSystem implements ISystem {
    private static archetype : SystemArchetype = [
        Transform.ComponentType,
        Dynamic.ComponentType
    ];

    getArchetype() {
        return DynamicsSystem.archetype;
    }

    run(world : World, transform : Transform, dyn : Dynamic) {
        transform.position.Add(Vector2.Scale(dyn.velocity, world.delta));
        dyn.velocity.Scale(dyn.resistance);
    }
}