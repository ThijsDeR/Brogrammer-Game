export default class BossInfo {
    static PLAYER_Y_SPEED = 9;
    static PLAYER_X_SPEED = 11;
    static PLAYER_HEALTH = 100;
    static PLAYER_STAMINA = 100;
    static PLAYER_STAMINA_LOSS = 1;
    static PLAYER_STAMINA_RECOVERY = 0.02;
    static PLAYER_STAMINA_RECOVERY_DELAY = 1000;
    static PLAYER_SHOOTING_DELAY = 200;
    static BACKGROUND_MUSIC_VOLUME = 1 / 5;
    static WIN_SOUND_VOLUME = 3 / 5;
    static BOSS_PROGRESS_OBJECT_NAME = 'boss';
    static SCATTER_SHOT_DELAY = 10000;
    static STARTING_PROJECTILE_DELAY = 1000;
    static MINIMUM_PROJECTILE_DELAY = 400;
    static PROJECTILE_DELAY_SPEED_UP = 5;
    static BOSS_HEALTH = 250;
    static PROJECTILE_IMAGE_SRC = [
        './assets/img/virus1.png',
        './assets/img/virus2.png',
        './assets/img/virus3.png',
        './assets/img/water_gun.png',
        './assets/img/angry.png',
        './assets/img/skulls.png',
        './assets/img/poop_emoji.png',
    ];
    static COMPLETE_SCORE_AWARD = 200;
}
