import { add } from "@asm";
import Collider from "@components/Collider";
import Dynamic from "@components/Dynamic";
import Joint from "@components/Joint";
import Renderable from "@components/Renderable";
import BounceSystem from "@systems/BounceSystem";
import DynamicsSystem from "@systems/DynamicsSystem";
import GravitySystem from "@systems/GravitySystem";
import JointRendererSystem from "@systems/JointRendererSystem";
import { onResize } from "./canvas";
import Transform from "./components/Transform";
import { Color } from "./core/Color";
import { Vector2 } from "./core/Vector";
import World from "./ecs/World";
import RendererSystem from "./systems/RendererSystem";


export class App {
    private ctxt : CanvasRenderingContext2D;
    private image : ImageData;

    constructor(ctxt : CanvasRenderingContext2D) {
        this.ctxt = ctxt;
        this.image = this.ctxt.createImageData(this.ctxt.canvas.width, this.ctxt.canvas.height);
    }

    Init() {
        onResize(this.onResize.bind(this));

        const world = World.create(this.ctxt);

        const testCube = world.entities.createEntity();
        world.components.addComponent(testCube, 
            new Transform(
                new Vector2(100, 100)
            ),
            new Renderable(
                new Vector2(-50, -50),
                new Vector2(100, 100)
            ),
            new Dynamic({
                gravity: true,
                resistance: 0.999
            }),
            new Collider({ bounds: {
                tl: new Vector2(-50, -50),
                br: new Vector2(50, 50)
            }})
        );
        
        const test2 = world.entities.createEntity();
        world.components.addComponent(test2, 
            new Transform(new Vector2(300, 100)),
            new Renderable(
                new Vector2(-25, -25),
                new Vector2(50, 50),
                new Color(1, 0, 1)
            ),
            new Dynamic({
                velocity: new Vector2(100, 0),
                gravity: true
            }),
            new Collider({ bounds: {
                tl: new Vector2(-25, -25),
                br: new Vector2(25, 25)
            }}),
            new Joint(testCube)
        );
        
        world.systems
            .addSystem(new DynamicsSystem())
            .addSystem(new BounceSystem(this.ctxt.canvas))
            .addSystem(new GravitySystem())
            .addSystem(new JointRendererSystem(this.ctxt))
            .addSystem(new RendererSystem(this.ctxt))

        world.systems.run();
    }

    onResize() {
        this.image = this.ctxt.createImageData(this.ctxt.canvas.width, this.ctxt.canvas.height);
    }

    Update(delta : number) {
        this.ctxt.fillStyle = 'rgb(0, 0, 0)';
        this.ctxt.fillRect(0, 0, this.ctxt.canvas.width, this.ctxt.canvas.height);
        World.current().Update(delta);
    }

    // Update(delta : number) {
    //     const image = this.image;
    //     let x, y;
    //     const pxWidth = image.width * 4;
    //     const pxHeight = image.height * 4;
    //     for(let i = 0; i < image.data.length; i += 4) {
    //         x = (i % pxWidth);
    //         y = Math.ceil(i / pxHeight);

    //         image.data[i] = (x / pxWidth) * 255;
    //         image.data[i + 1] = (y / image.height) * 255;
    //         image.data[i + 2] = 255 - image.data[i];
    //         image.data[i + 3] = 255;
    //     }

    //     this.ctxt.putImageData(this.image, 0, 0);
    // }
}