import { randomBetween } from "./Utility";

interface IVector {
    Add(vector : this) : void;
    Set(...values : number[]) : void;
    Clone() : any;
    toString() : string;
    toArray() : number[];
    toObject() : object;
    Normalize() : void;
}

export class Vector2 implements IVector {
    private state = [0, 0];
    private _length = 0;

    constructor(x : number, y : number) {
        this.state = [x, y];
        this.updateValues();
    }

    toString(): string {
        return `X: ${this.x}, Y: ${this.y}`
    }

    toArray(): number[] {
        return [...this.state];
    }

    toObject() {
        return {
            x: this.x,
            y: this.y
        }
    }

    static get Zero() {
        return new Vector2(0, 0);
    }

    static get One() {
        return new Vector2(1, 1);
    }

    get x() { return this.state[0] }
    get y() { return this.state[1] }

    set x(v : number) {
        if(isNaN(v)) v = 0;
        this.state[0] = v;
        this.updateValues();
    }

    set y(v : number) {
        if(isNaN(v)) v = 0;
        this.state[1] = v;
        this.updateValues();
    }

    get length() {
        return this._length;
    }

    get squareLength() {
        return this.x*this.x + this.y*this.y;
    }

    get angle() {
        return Math.atan2(this.y, this.x);
    }

    private updateValues() {
        this._length = Math.sqrt(this.x*this.x + this.y*this.y);
    }

    Set(x : number, y : number) {
        if(isNaN(x)) x = 0;
        if(isNaN(y)) y = 0;
        this.state = [x, y];
        this.updateValues();
        return this;
    }

    SetFrom(v : Vector2) {
        return this.Set(v.x, v.y);
    }
   

    static Scale(v : Vector2, s : number) {
        return new Vector2(v.x * s, v.y * s);
    }

    Scale(s : number) {
        return this.Set(this.x *  s, this.y * s);
    }



    static Add(a : Vector2, b : Vector2) {
        return new Vector2(a.x + b.x, a.y + b.y);
    }

    Add(v : Vector2) {
        return this.Set(this.x + v.x, this.y + v.y);
    }



    static AddScaled(origin : Vector2, add : Vector2, scale : number) {
        return new Vector2(origin.x + add.x * scale, origin.y + add.y * scale);
    }

    AddScaled(v : Vector2, scale : number) {
        return this.Set(this.x + v.x * scale, this.y + v.y * scale);
    }

    static SquareDistance(a : Vector2, b : Vector2) {
        const x = a.x - b.x;
        const y = a.y - b.y;
        return x*x + y*y;
    }

    static Distance(a : Vector2, b : Vector2) {
        const x = a.x - b.x;
        const y = a.y - b.y;
        return Math.sqrt(x*x + y*y);
    }

    DistanceTo(v : Vector2) {
        return Vector2.Distance(this, v);
    }

    static Normalize(v : Vector2) {
        return v.Clone().Scale(1 / v.length);
    }

    Normalize() {
        return this.Scale(1/this.length);
    }

    Reset() {
        return this.Set(0, 0);
    }

    Clone() {
        return new Vector2(this.x, this.y);
    }

    RotateBy(angle : number) {
        return this.Set(
            Math.cos(angle) * this.x - Math.sin(angle) * this.y,
            Math.sin(angle) * this.x + Math.cos(angle) * this.y
        );
    }

    SetAngle(angle : number) {
        const old_length = this.length;
        return this.Set(old_length * Math.cos(angle), old_length * Math.sin(angle));
    }

    static Random(minX : number, maxX : number, minY : number, maxY : number) {
        return new Vector2(randomBetween(minX, maxX), randomBetween(minY, maxY));
    }

    static UnitFromAngle(angle : number) {
        return new Vector2(Math.cos(angle), Math.sin(angle));
    }

    static RandomUnitVector() {
        return Vector2.UnitFromAngle(randomBetween(0, Math.PI * 2));
    }

    static Average(...vectors : Vector2[]) {
        if(vectors.length == 0) return Vector2.Zero;
        if(vectors.length == 1) return vectors[0].Clone();


        let x = 0, y = 0;
        for(const v of vectors) {
            x += v.x;
            y += v.y;
        }

        return new Vector2(x / vectors.length, y / vectors.length);
    }

    static FromTo(a : Vector2, b : Vector2) {
        return new Vector2(b.x - a.x, b.y - a.y);
    }

    AngleTo(v : Vector2) {
        return Vector2.FromTo(this, v).angle;
    }

    static Dot(a : Vector2, b : Vector2) {
        return a.x * b.x + a.y * b.y;
    }

    Dot(v : Vector2) {
        return Vector2.Dot(this, v);
    }

    static AngleTo(from : Vector2, to : Vector2) {
        return Vector2.FromTo(from, to).angle;
    }
}