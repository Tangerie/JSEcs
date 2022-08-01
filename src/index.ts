
import { App } from "./app";
import { SetupCanvas } from "./canvas";
import "./styles.css";

const context = SetupCanvas();

const app = new App(context);

app.Init();

let previous = performance.now();
let delta = 1;

const frameUpdate = (current_time : number) => {
    delta = current_time - previous;
    if(delta == 0) delta = 1;

    app.Update(delta * 0.001);

    previous = current_time;
    
    window.requestAnimationFrame(frameUpdate);
}

window.requestAnimationFrame(frameUpdate);