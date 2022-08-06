import Boid from "@components/Boid";
import Transform from "@components/Transform";
import ISystem, { SystemArchetype } from "@ecs/System";
import GameWorld from "game/GameWorld";

export default class BoidDebugSystem implements ISystem {
    private static archetype : SystemArchetype = [
        Transform.ComponentType,
        Boid.ComponentType
    ];

    getArchetype() {
        return BoidDebugSystem.archetype;
    }

    runAll(world : GameWorld, components : [Transform, Boid][]) {
        world.context.strokeStyle = "green";
        world.context.beginPath();

        components.forEach(comps => this.drawTargetDirection(world, ...comps));

        world.context.stroke();


        world.context.fillStyle = "rgb(71, 203, 255)";
        world.context.strokeStyle = "rgb(71, 203, 255)";
        

        components.forEach(comps => this.drawTargetPosition(world, ...comps));

        
    }

    drawTargetDirection(world : GameWorld, transform : Transform, boid : Boid) {
        world.context.moveTo(transform.position.x, transform.position.y);
        world.context.lineTo(
            transform.position.x + boid.target_direction.x * 40,
            transform.position.y + boid.target_direction.y * 40,
        )
    }

    drawTargetPosition(world : GameWorld, transform : Transform, boid : Boid) {
        world.context.beginPath();
        world.context.ellipse(boid.target_position.x, boid.target_position.y, 2, 2, 0, 0, Math.PI * 2);
        world.context.fill();
    }
}