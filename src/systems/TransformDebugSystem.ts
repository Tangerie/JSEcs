import Transform from "@components/Transform";
import ISystem, { SystemArchetype } from "@ecs/System";
import GameWorld from "game/GameWorld";

export default class TransformDebugSystem implements ISystem {
    private static archetype : SystemArchetype = [
        Transform.ComponentType
    ];

    directionScale : number = 40;

    getArchetype() {
        return TransformDebugSystem.archetype;
    }
    
    prerun(world : GameWorld) {
        world.context.strokeStyle = "red";
        world.context.beginPath();
    }

    run(world : GameWorld, transform : Transform) {
        world.context.moveTo(transform.position.x, transform.position.y);
        world.context.lineTo(
            transform.position.x + transform.rotation.x * this.directionScale,
            transform.position.y + transform.rotation.y * this.directionScale,
        )
    }

    postrun(world : GameWorld) {
        world.context.stroke();
    }
} 