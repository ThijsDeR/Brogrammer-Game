import KeyboardListener from './KeyboardListener.js';
import Scene from './Scene.js';
export default class CutScene extends Scene {
    keyboardListener;
    constructor(canvas, userData) {
        super(canvas, userData);
        this.keyboardListener = new KeyboardListener();
    }
}
//# sourceMappingURL=CutScene.js.map