export default abstract class TempleRunInfo {
  //player speed
  public static readonly PLAYER_Y_SPEED: number = 5;

  public static readonly PLAYER_X_SPEED: number = 12;

  public static readonly PLAYER_SPEED_UP: number = 1/10000;

  // Offset Relative to canvas width or height
  public static readonly PLAYER_X_OFFSET: number = 1/10 // width

  public static readonly PLAYER_WIDTH: number = 1/40 // width

  public static readonly PLAYER_HEIGHT: number = 1/10 // height

  // Text
  public static readonly SCORE_TEXT_X_POS: number = 1/2 // width

  public static readonly SCORE_TEXT_Y_POS: number = 1/20 // height

  public static readonly SCORE_TEXT_FONT_SIZE: number = 1/50 // height


  // Music volume
  public static readonly BACKGROUND_MUSIC_VOLUME: number = 1/5

  public static readonly WRONG_SOUND_VOLUME: number = 4/5

  public static readonly CORRECT_SOUND_VOLUME: number = 3/5

  public static readonly WIN_SOUND_VOLUME: number = 3/5

  public static readonly WIN_COIN_AMOUNT: number = 10;

  public static readonly WIN_SCORE: number = 20;

  public static readonly COMPLETE_SCORE_AWARD: number = 100

  public static readonly TEMPLE_RUN_PROGRESS_OBJECT_NAME: string = 'templerun'
}