import GameSceneHandler from './GameSceneHandler.js';

/**
 * Represents a basic Game Loop based on `requestAnimationFrame()`.
 *
 * The implementation of this class depends on another class: `Game`. This
 * means that, if you use this class, you need to either have a `Game` class
 * that exactly implements the three methods `processInput()`, `update(elapsed)`
 * and `render()` or change the code in the `step()` method of this class so it
 * represents your own game methods.
 *
 * @see https://gameprogrammingpatterns.com/game-loop.html
 * @author BugSlayer
 */
export default class GameEngine {
  public static readonly STATE_IDLE = 0;

  public static readonly STATE_STARTING = 1;

  public static readonly STATE_RUNNING = 2;

  public static readonly STATE_STOPPING = 3;

  public static readonly NORMAL_MODE = 0;

  public static readonly PLAY_CATCH_UP = 1;

  /**
   * The current mode of the GameEngine
   */
  private mode: number;

  /**
   * The current state of this GameEngine
   */
  private state: number;

  /**
   * The game to animate
   */
  private sceneHandler: GameSceneHandler;

  private previousElapsed: number;

  /**
   * Holds the start time of the game
   */
  private gameStart: number;

  /**
   * Holds the time where the last animation step method ended.
   */
  private frameEnd: number;

  /**
   * The total time in milliseconds that is elapsed since the start of the
   * game
   */
  public gameTime: number;

  /**
   * The amount of frames that are processed since the start of the game
   */
  public frameCount: number;

  /**
   * An indication of the current crames per second of this GameEngine
   */
  public fps: number;

  /**
   * An indication of the load of this GameEngine. The load is the ratio between
   * the time needed to update the game and the time the computer waits to
   * render the next frame.
   */
  public load: number;

  /**
   * Construct a new instance of this class.
   *
   * @param sceneHandler l
   * @param mode OPTIONAL, the mode of the GameEngine. It defaults to
   *   GameEngine.NORMAL_MODE, which is fine for simple games
   */
  constructor(sceneHandler: GameSceneHandler, mode: number = GameEngine.NORMAL_MODE) {
    this.state = GameEngine.STATE_IDLE;
    this.mode = mode;
    this.sceneHandler = sceneHandler;
  }

  /**
   * Start the game loop.
   */
  public start(): void {
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

  /**
   * Requests to gracefully stop the GameEngine.
   */
  public stop(): void {
    this.state = GameEngine.STATE_STOPPING;
  }

  /**
   * Returns `true` if the given state exactly matches the current state of
   * this object
   *
   * @param state the state to check
   * @returns `true` if the given state exactly matches the current state of
   *   this object
   */
  public isInState(state: number): boolean {
    return this.state === state;
  }

  /**
   * This MUST be an arrow method in order to keep the `this` variable working
   * correctly. It will be overwritten by another object otherwise caused by
   * javascript scoping behaviour.
   *
   * @param timestamp a `DOMHighResTimeStamp` similar to the one returned by
   *   `performance.now()`, indicating the point in time when `requestAnimationFrame()`
   *   starts to execute callback functions
   */
  private step = (timestamp: number) => {
    // Handle first animation frame
    if (this.isInState(GameEngine.STATE_STARTING)) {
      this.state = GameEngine.STATE_RUNNING;
    }

    this.sceneHandler.processInput();

    // Let the game update itself
    let shouldStop = false;
    if (this.mode === GameEngine.PLAY_CATCH_UP) {
      const step = 1;
      while (this.previousElapsed < timestamp && !shouldStop) {
        shouldStop = this.sceneHandler.update(step);
        this.previousElapsed += step;
      }
    } else {
      const elapsed = timestamp - this.previousElapsed;
      shouldStop = this.sceneHandler.update(elapsed);
      this.previousElapsed = timestamp;
    }

    // Let the game render itself
    this.sceneHandler.render();

    // Check if a next animation frame needs to be requested
    if (!shouldStop || this.isInState(GameEngine.STATE_STOPPING)) {
      requestAnimationFrame(this.step);
    } else {
      this.state = GameEngine.STATE_IDLE;
    }

    // Handle time measurement and analysis
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
