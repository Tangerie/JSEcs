import Boid from "@components/Boid";
import SpriteRenderable from "@components/SpriteRenderable";
import CanvasLayers, { LayerType } from "@core/CanvasLayers";
import Sprite from "@core/Sprite";
import { EntityFactory } from "@ecs/EntityFactory";
import BoidBoundsSystem from "@systems/BoidBoundsSystem";
import BoidSystem from "@systems/BoidSystem";
import GameWorld from "game/GameWorld";
import Transform from "./components/Transform";
import { Vector2 } from "./core/Vector";
import SpriteRendererSystem from "./systems/SpriteRendererSystem";

import TriangleImage from "assets/sprites/Triangle.png";
import TransformMoveSystem from "@systems/TransformMoveSystem";
import TransformDebugSystem from "@systems/TransformDebugSystem";
import BoidDebugSystem from "@systems/BoidDebugSystem";
import WorldRunner, { EventType } from "@ecs/WorldRunner";
import Game from "game/game";

const triangleSprite = new Sprite(TriangleImage, {
    targetHeight: 30,
    targetWidth: 30,
    rotation: Math.PI / 2
});



export class App {
    private layers : CanvasLayers;

    constructor() {
        this.layers = new CanvasLayers();   
    }

    Begin() {
        const gameCanvas = document.createElement("canvas");
        const ctxt = gameCanvas.getContext("2d", {
            alpha: false
        });

        if(!ctxt) throw new Error("2D Rendering Not Supported");

        document.body.appendChild(gameCanvas);

        this.layers.addLayer("game", {
            canvas: gameCanvas,
            context: ctxt,
            type: LayerType.Default
        });

        this.layers.createCanvas("ui", LayerType.DefaultUI);

        const world = GameWorld.create(this.layers);

        const game = new Game();

        const runner = new WorldRunner(world)
            .addEvent(EventType.Init, game.Init.bind(game))
            .addEvent(EventType.Preupdate, game.Preupdate.bind(game))
            .addEvent(EventType.Postupdate, game.Postupdate.bind(game))
            .Start();
    }
}