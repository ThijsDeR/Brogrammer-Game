export default abstract class GameInfo {
  public static readonly PLAYER_Y_SPEED: number = 9;

  public static readonly PLAYER_X_SPEED: number = 12;

  public static readonly GRAVITY_CONSTANT: number = 0.098;

  public static readonly PLAYER_AIRBORNE_X_SPEED_PENTALTY: number = 2;

  public static readonly ELAPSED_PENALTY: number = 1/10

  public static readonly IMG_PATH: string = './assets/img/'

  public static readonly SOUND_PATH: string = './assets/Sound/';
}