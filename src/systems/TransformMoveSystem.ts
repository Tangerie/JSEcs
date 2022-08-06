import Transform from "@components/Transform";
import ISystem, { SystemArchetype } from "@ecs/System";
import GameWorld from "game/GameWorld";

export default class TransformMoveSystem implements ISystem {
    private static archetype : SystemArchetype = [
        Transform.ComponentType,
    ];

    getArchetype() {
        return TransformMoveSystem.archetype;
    }

    run(world : GameWorld, transform : Transform) {
        transform.position.AddScaled(transform.velocity, world.delta);
    }
}