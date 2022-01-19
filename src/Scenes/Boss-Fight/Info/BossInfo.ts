export default abstract class BossInfo {
  public static readonly PLAYER_Y_SPEED: number = 9;

  public static readonly PLAYER_X_SPEED: number = 11;

  public static readonly WIN_SCORE: number = 30;

  public static readonly WIN_SOUND_VOLUME: number = 3/5;

  // Text
  public static readonly SCORE_TEXT_X_POS: number = 1/2 // width

  public static readonly SCORE_TEXT_Y_POS: number = 1/20 // height

  public static readonly SCORE_TEXT_FONT_SIZE: number = 1/50 // height
  
  public static readonly BOSS_PROGRESS_OBJECT_NAME: string = 'boss'

  public static readonly STARTING_PROJECTILE_DELAY: number = 1000

  public static readonly MINIMUM_PROJECTILE_DELAY: number = 400

  public static readonly PROJECTILE_DELAY_SPEED_UP: number = 5

  public static readonly BOSS_TEXTS: string[] = [
    "Jij bent niet leuk",
    "Ik heb je IP-Adres",
    "Ik ga je kapot maken"
  ]

  public static readonly BOSS_HEALTH = 100;
}