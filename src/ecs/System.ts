import { ComponentType, IComponent } from "./Component";
import World from "./World";

export type SystemArchetype = ComponentType[];

export default interface System {
    getArchetype() : SystemArchetype;
    prerun?(world : World) : void;
    run(world? : World, ...components : IComponent[]) : void;
}