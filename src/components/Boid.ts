import { ComponentType, IComponent } from "@ecs/Component";
import { Vector2 } from "core/Vector";

interface BoidConfig {
    speed : number;
    vRange : number;
    steer_speed : number;
}

export default class Boid implements IComponent {
    static readonly ComponentType : ComponentType = Symbol("BoidComponent");

    speed : number = 50;
    private _range : number = 150;
    private _sqrRange : number = this._range*this._range;

    get vRange() {
        return this._range;
    }

    get sqrRange() {
        return this._sqrRange;
    }

    set vRange(v : number) {
        this._range = v;
        this._sqrRange = v*v;
    }
    
    target_direction : Vector2 = Vector2.UnitFromAngle(0);
    target_position : Vector2 = Vector2.Zero;
    
    steer_speed : number = 0.25;

    constructor(args?: Partial<BoidConfig>) {
        Object.assign(this, args);
    }

    getComponentType() {
        return Boid.ComponentType;
    }
}