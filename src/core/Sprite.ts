type Image = HTMLImageElement;

interface SpriteConstructor {
    targetWidth : number;
    targetHeight : number;
    rotation : number;
}

export default class Sprite {
    readonly image : Image;
    loaded : boolean = false;

    private _naturalWidth : number = 1;
    private _naturalHeight : number = 1;

    targetWidth? : number;
    targetHeight? : number;

    rotation : number = 0;

    get width() {
        return this.targetWidth ?? this._naturalWidth;
    }

    get height() {
        return this.targetHeight ?? this._naturalHeight;
    }

    constructor(path : string, args : Partial<SpriteConstructor>) {
        this.image = new Image(50, 50);
        this.image.src = path;
        
        Object.assign(this, args);

        this.image.onload = () => {
            this.loaded = true;
            this._naturalWidth = this.image.naturalWidth;
            this._naturalHeight = this.image.naturalHeight;
        }

    }
}