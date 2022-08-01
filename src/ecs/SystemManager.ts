import System from "./System";
import World from "./World";


export default class SystemManager {
    private systems : Set<System> = new Set();

    private world : World;

    constructor(world : World) {
        this.world = world;
    }

    addSystem(sys : System) {
        this.systems.add(sys);

        return this;
    }

    private runSystem(sys : System) {
        const arch = sys.getArchetype();
        const matches = this.world.components.getFromArchetype(arch);
        if(sys.prerun) sys.prerun(this.world);
        
        for(const m of matches) {
            sys.run(this.world, ...m);
        }
    }

    run() {
        for(const s of this.systems) {
            this.runSystem(s);
        }
    }
}