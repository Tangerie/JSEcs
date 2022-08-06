import Boid from "@components/Boid";
import Transform from "@components/Transform";
import ISystem, { SystemArchetype } from "@ecs/System";
import World from "@ecs/World";
import GameWorld from "game/GameWorld";

export default class BoidBoundsSystem implements ISystem<[Transform, Boid]> {
    private static archetype : SystemArchetype = [
        Transform.ComponentType,
        Boid.ComponentType
    ];

    getArchetype() {
        return BoidBoundsSystem.archetype;
    }

    run(world : GameWorld, transform : Transform, boid : Boid) {
        const maxX = world.context.canvas.width;
        const maxY = world.context.canvas.height;

        if(transform.position.x < 0) transform.position.x = maxX;
        else if (transform.position.y < 0) transform.position.y = maxY;

        if(transform.position.x > maxX) transform.position.x = 0;
        else if (transform.position.y > maxY) transform.position.y = 0;
    }
}