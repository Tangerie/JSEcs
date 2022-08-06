type Canvas = HTMLCanvasElement;
type ResizeHandler = (width: number, height : number) => void;

export enum LayerType {
    Default,
    DefaultUI,
    Misc
}

export interface CanvasLayer {
    canvas : Canvas;
    context : CanvasRenderingContext2D;
    type : LayerType;
}

export default class CanvasLayers {
    private _layers = new Map<string, CanvasLayer>();
    private _defaultLayer : CanvasLayer | null = null;
    private _uiLayer : CanvasLayer | null = null;
    private _resizeHandlers : Array<ResizeHandler> = [];
    
    constructor() {
        window.addEventListener("resize", () => this._onResize());
    }

    get default() {
        if(!this._defaultLayer) throw new Error("No Default Layer");
        return this._defaultLayer;
    }

    get ui() {
        if(!this._uiLayer) throw new Error("No Default UI Layer");
        return this._uiLayer;
    }

    get width() {
        return this.default.canvas.width;
    }

    get height() {
        return this.default.canvas.height;
    }

    createCanvas(name : string, type : LayerType = LayerType.Misc, root = document.body) {
        const canvas = document.createElement("canvas");
        root.appendChild(canvas);
        return this.addLayerFromCanvas(name, canvas, type);
    }

    addLayerFromCanvas(name : string, canvas : Canvas, type : LayerType = LayerType.Misc) {
        const ctxt = canvas.getContext("2d");
        if(!ctxt) throw new Error("2D Rendering Not Supported");

        return this.addLayer(name, {
            canvas: canvas,
            context: ctxt,
            type: type
        });
    }

    addLayer(name : string, layer : CanvasLayer) {
        this._layers.set(name, layer);
        if(layer.type == LayerType.Default) this._defaultLayer = layer;
        else if(layer.type == LayerType.DefaultUI) this._uiLayer = layer;
        
        this.resizeCanvas(layer.canvas);
        
        return this;
    }

    get(name : string) {
        if(!this._layers.get(name)) throw new Error(`No layer ${name}`);
        return this._layers.get(name);
    }

    onResize(cb : ResizeHandler) {
        this._resizeHandlers.push(cb);
        return this;
    }

    private resizeCanvas(canvas : Canvas) {
        canvas.width = canvas.parentElement?.clientWidth ?? document.documentElement.clientWidth;
        canvas.height = canvas.parentElement?.clientHeight ?? document.documentElement.clientHeight;
    }

    private _onResize() {
        this._layers.forEach(layer => this.resizeCanvas(layer.canvas));

        this._resizeHandlers.forEach(cb => cb(this.default.canvas.width, this.default.canvas.height))
    }
}   