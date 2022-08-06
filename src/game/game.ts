import Boid from "@components/Boid";
import SpriteRenderable from "@components/SpriteRenderable";
import Transform from "@components/Transform";
import { Vector2 } from "@core/Vector";
import { EntityFactory } from "@ecs/EntityFactory";
import BoidBoundsSystem from "@systems/BoidBoundsSystem";
import BoidDebugSystem from "@systems/BoidDebugSystem";
import BoidSystem from "@systems/BoidSystem";
import SpriteRendererSystem from "@systems/SpriteRendererSystem";
import TransformDebugSystem from "@systems/TransformDebugSystem";
import TransformMoveSystem from "@systems/TransformMoveSystem";
import GameWorld from "./GameWorld";
import Triangle from "./sprites/Triangle";

const boidFactory : EntityFactory<GameWorld> = (entity, world : GameWorld) => {
    world.components.addComponent(entity, 
        new Transform(
            Vector2.Random(100, world.context.canvas.width - 100, 100, world.context.canvas.height - 100),
            Vector2.RandomUnitVector()
        ),
        new SpriteRenderable(
            Vector2.Zero,
            Vector2.One,
            Triangle
        ),
        new Boid({
            speed: 100,
            vRange: 4000
        })
    );
}

export default class Game {

    Init(world : GameWorld) {
        const entities = world.instantiate(200, boidFactory);
        console.log(entities);
        
        world.systems
            .addSystem(new BoidBoundsSystem())
            .addSystem(new BoidSystem())
            .addSystem(new BoidDebugSystem())
            .addSystem(new TransformMoveSystem())
            .addSystem(new TransformDebugSystem())
            .addSystem(new SpriteRendererSystem())
    }

    onResize(world : GameWorld) {}

    Preupdate(world : GameWorld) {
        world.context.clearRect(0, 0, world.layers.width, world.layers.height);

        if(world.tick % 5 == 0) {
            this.drawFPSDebug(world);
        }
    }

    Postupdate(world : GameWorld) {

    }

    drawFPSDebug(world : GameWorld) {
        const ctxt = world.uiContext;

        ctxt.clearRect(0, 0, world.layers.width, world.layers.height);

        ctxt.fillStyle = "white";
        ctxt.font = "36px RandyGG";
        ctxt.textAlign = "right";
        ctxt.textBaseline = "top";

        const fps = Math.round(1 / world.delta);

        ctxt.fillText(fps.toString(), world.layers.width - 20, 20);
    }
}