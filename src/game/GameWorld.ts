import CanvasLayers from "@core/CanvasLayers";
import { Entity } from "@ecs/Entity";
import { EntityFactory } from "@ecs/EntityFactory";
import World, { IWorld } from "@ecs/World";

export default class GameWorld extends World implements IWorld {
    private _layers : CanvasLayers;

    zoom : number = 1;

    protected constructor(layers : CanvasLayers) {
        super();

        this._layers = layers;
    }

    static create(layers : CanvasLayers) {
        const w = new GameWorld(layers);
        this._current = w;
        return w;
    }

    get context() {
        return this._layers.default.context;
    }

    get uiContext() {
        return this._layers.ui.context;
    }

    get layers() {
        return this._layers;
    }

    instantiate(number : number = 1, ...factories : EntityFactory<GameWorld>[]) {
        const ids = new Array<Entity>(number);

        for(let i = 0; i < number; i++) {
            const entity = ids[i] = this.entities.createEntity();
            for(const factory of factories) {
                factory(entity, this);
            }
        }

        return ids;
    }
}