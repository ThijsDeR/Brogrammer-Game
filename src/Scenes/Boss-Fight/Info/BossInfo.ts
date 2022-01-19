export default abstract class BossInfo {
  public static readonly PLAYER_Y_SPEED: number = 9;

  public static readonly PLAYER_X_SPEED: number = 11;

  public static readonly BACKGROUND_MUSIC_VOLUME: number = 1/5;

  public static readonly WIN_SOUND_VOLUME: number = 3/5;
  
  public static readonly BOSS_PROGRESS_OBJECT_NAME: string = 'boss'

  public static readonly SCATTER_SHOT_DELAY: number = 10000

  public static readonly STARTING_PROJECTILE_DELAY: number = 1000

  public static readonly MINIMUM_PROJECTILE_DELAY: number = 400

  public static readonly PROJECTILE_DELAY_SPEED_UP: number = 5

  public static readonly BOSS_TEXTS: string[] = [
    "Jij bent niet leuk",
    "Ik heb je IP-Adres",
    "Ik ga je kapot maken"
  ]

  public static readonly BOSS_HEALTH = 500;
}