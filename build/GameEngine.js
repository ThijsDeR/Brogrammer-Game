export default class GameEngine {
    static STATE_IDLE = 0;
    static STATE_STARTING = 1;
    static STATE_RUNNING = 2;
    static STATE_STOPPING = 3;
    static NORMAL_MODE = 0;
    static PLAY_CATCH_UP = 1;
    mode;
    state;
    sceneHandler;
    previousElapsed;
    gameStart;
    frameEnd;
    gameTime;
    frameCount;
    fps;
    load;
    constructor(sceneHandler, mode = GameEngine.NORMAL_MODE) {
        this.state = GameEngine.STATE_IDLE;
        this.mode = mode;
        this.sceneHandler = sceneHandler;
    }
    start() {
        if (this.state === GameEngine.STATE_IDLE) {
            this.state = GameEngine.STATE_STARTING;
            this.gameStart = performance.now();
            this.frameEnd = this.gameStart;
            this.previousElapsed = this.gameStart;
            this.gameTime = 0;
            this.frameCount = 0;
            requestAnimationFrame(this.step);
        }
    }
    stop() {
        this.state = GameEngine.STATE_STOPPING;
    }
    isInState(state) {
        return this.state === state;
    }
    step = (timestamp) => {
        if (this.isInState(GameEngine.STATE_STARTING)) {
            this.state = GameEngine.STATE_RUNNING;
        }
        this.sceneHandler.processInput();
        let shouldStop = false;
        if (this.mode === GameEngine.PLAY_CATCH_UP) {
            const step = 1;
            while (this.previousElapsed < timestamp && !shouldStop) {
                shouldStop = this.sceneHandler.update(step);
                this.previousElapsed += step;
            }
        }
        else {
            const elapsed = timestamp - this.previousElapsed;
            shouldStop = this.sceneHandler.update(elapsed);
            this.previousElapsed = timestamp;
        }
        this.sceneHandler.render();
        if (!shouldStop || this.isInState(GameEngine.STATE_STOPPING)) {
            requestAnimationFrame(this.step);
        }
        else {
            this.state = GameEngine.STATE_IDLE;
        }
        const now = performance.now();
        const stepTime = timestamp - now;
        const frameTime = now - this.frameEnd;
        this.fps = Math.round(1000 / frameTime);
        this.load = stepTime / frameTime;
        this.frameEnd = now;
        this.gameTime = now - this.gameStart;
        this.frameCount += 1;
    };
}
//# sourceMappingURL=GameEngine.js.map