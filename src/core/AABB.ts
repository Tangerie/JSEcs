import { Vector2 } from "./Vector";

export interface AABB {
    tl : Vector2;
    br : Vector2;
}

export class AABB {
    tl : Vector2 = Vector2.Zero;
    br : Vector2 = Vector2.Zero;

    constructor(args? : Partial<AABB>) {
        Object.assign(this, args);
    }
}