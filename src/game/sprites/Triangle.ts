import Sprite from "@core/Sprite";
import TriangleImage from "@assets/sprites/Triangle.png";

const Triangle = new Sprite(TriangleImage, {
    targetHeight: 30,
    targetWidth: 30,
    rotation: Math.PI / 2
});

export default Triangle;