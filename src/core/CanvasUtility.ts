import Transform from "@components/Transform";
import GameWorld from "game/GameWorld";
import { Vector2 } from "./Vector";

export function drawRelativeTo(ctxt : GameWorld['context'], offset : Vector2, rotation : number, scale : number, drawFn : () => void) {
    ctxt.save();

    ctxt.scale(scale, scale);

    ctxt.translate(offset.x, offset.y);

    ctxt.rotate(rotation);

    drawFn();

    ctxt.restore();
}