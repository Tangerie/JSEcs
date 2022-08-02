import Joint from "@components/Joint";
import Renderable from "@components/Renderable";
import Transform from "@components/Transform";
import ISystem, { SystemArchetype } from "@ecs/System";
import World from "@ecs/World";
import { Vector2 } from "src/core/Vector";

export default class JointRendererSystem implements ISystem {
    private static archetype : SystemArchetype = [
        Transform.ComponentType,
        Joint.ComponentType
    ];

    ctxt : CanvasRenderingContext2D;

    constructor(ctxt : CanvasRenderingContext2D) {
        this.ctxt = ctxt;
    }

    getArchetype() {
        return JointRendererSystem.archetype;
    }

    run(world : World, transform : Transform, joint : Joint) {
        const [ otherTransform ] = world.components.getForEntity<[Transform]>(joint.other, Transform.ComponentType);

        this.ctxt.strokeStyle =  'rgb(255, 0, 0)';
        this.ctxt.beginPath();
        this.ctxt.moveTo(transform.position.x, transform.position.y);
        this.ctxt.lineTo(otherTransform.position.x, otherTransform.position.y);
        this.ctxt.stroke();
    }
}