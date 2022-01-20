export default abstract class BossInfo {
  public static readonly PLAYER_Y_SPEED: number = 9;

  public static readonly PLAYER_X_SPEED: number = 11;

  public static readonly PLAYER_HEALTH: number = 100;
  
  public static readonly PLAYER_STAMINA: number = 100;

  public static readonly PLAYER_STAMINA_LOSS: number = 1;

  public static readonly PLAYER_STAMINA_RECOVERY: number = 0.02

  public static readonly PLAYER_STAMINA_RECOVERY_DELAY: number = 1000;

  public static readonly BACKGROUND_MUSIC_VOLUME: number = 1/5;

  public static readonly WIN_SOUND_VOLUME: number = 3/5;
  
  public static readonly BOSS_PROGRESS_OBJECT_NAME: string = 'boss'

  public static readonly SCATTER_SHOT_DELAY: number = 10000

  public static readonly STARTING_PROJECTILE_DELAY: number = 1000

  public static readonly MINIMUM_PROJECTILE_DELAY: number = 400

  public static readonly PROJECTILE_DELAY_SPEED_UP: number = 5

  public static readonly BOSS_HEALTH = 250;

  public static readonly PROJECTILE_IMAGE_SRC: string[] = [
    './assets/img/virus1.png',
    './assets/img/virus2.png',
    './assets/img/virus3.png',
    './assets/img/water_gun.png',
    './assets/img/angry.png',
    './assets/img/skulls.png',
    './assets/img/poop_emoji.png',
  ]

  public static readonly COMPLETE_SCORE_AWARD: number = 200
}