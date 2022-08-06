
import WorldRunner from "@ecs/WorldRunner";
import GameWorld from "game/GameWorld";
import { App } from "./app";
import "./styles.css";


const app = new App();

window.addEventListener("load", () => {
    app.Begin();
});