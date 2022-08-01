const resizeHandlerList : ResizeHandler[] = [];

export function SetupCanvas() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if(!canvas) throw new Error("No Canvas Found");

    const ctxt = canvas.getContext("2d");
    if(!ctxt) throw new Error("2D Rendering Not Supported");

    Resize(canvas, ctxt);
    window.addEventListener("resize", () => Resize(canvas, ctxt));

    return ctxt;
}

export function Resize(canvas : HTMLCanvasElement, ctxt : CanvasRenderingContext2D) {
    let temp = ctxt.getImageData(0, 0, ctxt.canvas.width, ctxt.canvas.height);
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    ctxt.putImageData(temp, 0, 0);

    for(const c of resizeHandlerList) {
        c(canvas.width, canvas.height);
    }
}

export function onResize(cb : ResizeHandler) {
    resizeHandlerList.push(cb);
}