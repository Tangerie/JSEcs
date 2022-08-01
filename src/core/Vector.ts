interface IVector {
    Add(vector : this) : void;
    Set(...values : number[]) : void;
    Clone() : any;
}

export class Vector2 implements IVector {
    private state = [0, 0];
    private _length = 0;

    constructor(x : number, y : number) {
        this.state = [x, y];
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
        this.state[0] = v;
        this.updateValues();
    }

    set y(v : number) {
        this.state[1] = v;
        this.updateValues();
    }

    get length() {
        return this._length;
    }

    private updateValues() {
        this._length = Math.sqrt(this.x*this.x + this.y*this.y);
    }

    Set(x : number, y : number) {
        this.state = [x, y];
        this.updateValues();
    }

    static Add(a : Vector2, b : Vector2) {
        return new Vector2(a.x + b.x, a.y + b.y);
    }

    static Scale(v : Vector2, s : number) {
        return new Vector2(v.x * s, v.y * s);
    }

    Scale(s : number) {
        this.Set(this.x *  s, this.y * s);
    }

    Add(v : Vector2) {
        this.Set(this.x + v.x, this.y + v.y);
    }

    Clone() {
        return new Vector2(this.x, this.y);
    }
}