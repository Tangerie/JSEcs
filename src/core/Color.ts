export interface IColor {
    toString() : string;
}

export class Color implements IColor {
    private _rgb = [0, 0, 0];

    constructor(r : number, g : number, b : number) {
        this._rgb = [r, g, b];
    }

    get r() { return this._rgb[0] }
    get g() { return this._rgb[1] }
    get b() { return this._rgb[2] }

    toString() {
        return `rgb(${this.r * 255}, ${this.g * 255}, ${this.b * 255})`;
    }

    static get Black() {
        return new Color(0, 0, 0);
    }

    static get White() {
        return new Color(1, 1, 1);
    }
}