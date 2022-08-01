import ComponentManager from "./ComponentManager";
import EntityManager from "./EntityManager";
import SystemManager from "./SystemManager";

export default class World {
    protected static _current : World | undefined;

    static current() {
        if(!this._current) throw new Error("No world created");
        return this._current;
    }

    static create(ctxt : CanvasRenderingContext2D) {
        const w = new World(ctxt);
        this._current = w;
        return w;
    }

    private ctxt : CanvasRenderingContext2D;
    private _tick : number = 0;
    private _delta : number = 1;

    public readonly components : ComponentManager;
    public readonly entities : EntityManager;
    public readonly systems : SystemManager;

    private constructor(ctxt : CanvasRenderingContext2D) {
        this.ctxt = ctxt;
        this.components = new ComponentManager();
        this.entities = new EntityManager();
        this.systems = new SystemManager(this);
    }

    get tick() { return this._tick }

    get delta() { return this._delta }


    Update(delta : number) {
        this._delta = delta;

        this.systems.run();

        this._tick++;
    }

}