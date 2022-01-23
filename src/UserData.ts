import GameInfo from './GameInfo.js';

export default class UserData {
  public static readonly COIN_OBJECT_NAME: string = 'coins';

  public static readonly QUESTIONS_OBJECT_NAME: string = 'questions';

  public static readonly SKINS_OBJECT_NAME: string = 'skins';

  public static readonly CURRENT_SKIN_OBJECT_NAME: string = 'current_skin';

  public static readonly STORY_PROGRESS_OBJECT_NAME: string = 'story_progress';

  public static readonly MASTER_SOUND_OBJECT_NAME: string = 'master_sound';

  public static readonly MUSIC_SOUND_OBJECT_NAME: string = 'music_sound';

  public static readonly UI_SOUND_OBJECT_NAME: string = 'ui_sound';

  public static readonly SOUND_OBJECT_NAME: string = 'sound';

  private coins: number;

  private questions: {
    question: string,
    answers: { answer: string,
      correct: boolean }[],
    questionInfo: string,
    id: number }[];

  private skins: { src: string, id: number, name: string }[];

  private currentSkin: number;

  private storyProgress: { nPCs: { name: string, talkedTo: boolean, finished: boolean }[] };

  private sounds: { name: string, procent: number }[];

  /**
   *
   */
  public constructor() {
    if (localStorage.getItem(UserData.COIN_OBJECT_NAME)) {
      this.coins = Number(localStorage.getItem(UserData.COIN_OBJECT_NAME));
    } else {
      this.coins = 0;
      localStorage.setItem(UserData.COIN_OBJECT_NAME, `${this.coins}`);
    }

    if (localStorage.getItem(UserData.QUESTIONS_OBJECT_NAME)) {
      this.questions = JSON.parse(localStorage.getItem(UserData.QUESTIONS_OBJECT_NAME));
    } else {
      this.questions = [];
      localStorage.setItem(UserData.QUESTIONS_OBJECT_NAME, JSON.stringify(this.questions));
    }

    if (localStorage.getItem(UserData.SKINS_OBJECT_NAME)) {
      this.skins = JSON.parse(localStorage.getItem(UserData.SKINS_OBJECT_NAME));
    } else {
      this.skins = [
        { src: `${GameInfo.IMG_PATH}Sam_Suong/robot-preview.png`, id: 0, name: 'Normale Robot' },
      ];
      localStorage.setItem(UserData.SKINS_OBJECT_NAME, JSON.stringify(this.skins));
    }

    if (localStorage.getItem(UserData.CURRENT_SKIN_OBJECT_NAME)) {
      this.currentSkin = Number(localStorage.getItem(UserData.CURRENT_SKIN_OBJECT_NAME));
    } else {
      this.currentSkin = 0;
      localStorage.setItem(UserData.CURRENT_SKIN_OBJECT_NAME, `${this.currentSkin}`);
    }

    if (localStorage.getItem(UserData.STORY_PROGRESS_OBJECT_NAME)) {
      this.storyProgress = JSON.parse(localStorage.getItem(UserData.STORY_PROGRESS_OBJECT_NAME));
    } else {
      this.storyProgress = { nPCs: [] };
      localStorage.setItem(UserData.STORY_PROGRESS_OBJECT_NAME, JSON.stringify(this.storyProgress));
    }

    if (localStorage.getItem(UserData.SOUND_OBJECT_NAME)) {
      this.sounds = JSON.parse(localStorage.getItem(UserData.SOUND_OBJECT_NAME));
    } else {
      this.sounds = [];
      localStorage.setItem(UserData.SOUND_OBJECT_NAME, JSON.stringify(this.sounds));
    }
  }

  /**
   * Getter for coins
   *
   * @returns Amount of coins the player has.
   */
  public getCoins(): number {
    return this.coins;
  }

  /**
   * Method that adds coins to the player.$
   *
   * @param amount amount of coins
   */
  public increaseCoins(amount: number): void {
    this.coins += amount;
    localStorage.setItem(UserData.COIN_OBJECT_NAME, `${this.coins}`);
  }

  /**
   * Method that removes coins from the player
   *
   * @param amount amount of coins
   */
  public decreaseCoins(amount: number): void {
    this.coins -= amount;
    localStorage.setItem(UserData.COIN_OBJECT_NAME, `${this.coins}`);
  }

  /**
   * @param question question array
   * @param question.question the question
   * @param question.answers anwsers to the question
   * @param question.questionInfo the extra info on the question
   * @param question.id which number the question is
   */
  public addQuestion(
    question: { question: string,
      answers: { answer: string,
        correct: boolean }[],
      questionInfo: string,
      id: number },
  ): void {
    let shouldAdd = true;

    this.questions.forEach((existingQuestion) => {
      if (existingQuestion.id === question.id) shouldAdd = false;
    });

    if (shouldAdd) {
      this.questions.push(question);
      this.questions.sort((firstEl, secondEl) => firstEl.id - secondEl.id);
      localStorage.setItem(UserData.QUESTIONS_OBJECT_NAME, JSON.stringify(this.questions));
    }
  }

  /**
   * Getter for Questions
   *
   * @returns questions
   */
  public getQuestions(): {
    question: string,
    answers: { answer: string,
      correct: boolean }[],
    questionInfo: string,
    id: number }[] {
    return this.questions;
  }

  /**
   * @param skin skin array
   * @param skin.src the source of the skin
   * @param skin.id the number of the skin
   * @param skin.name the name of the skin
   */
  public addSkin(skin: { src: string, id: number, name: string }): void {
    this.skins.push(skin);
    this.skins.sort((firstEl, secondEl) => firstEl.id - secondEl.id);
    localStorage.setItem(UserData.SKINS_OBJECT_NAME, JSON.stringify(this.skins));
  }

  /**
   *
   */
  public decreaseCurrentSkin(): void {
    this.changeCurrentSkin(this.currentSkin - 1);
  }

  /**
   *
   */
  public increaseCurrentSkin(): void {
    this.changeCurrentSkin(this.currentSkin + 1);
  }

  private changeCurrentSkin(skinIndex: number) {
    if (skinIndex > this.skins.length - 1) this.currentSkin = 0;
    else if (skinIndex < 0) this.currentSkin = this.skins.length - 1;
    else this.currentSkin = skinIndex;
    localStorage.setItem(UserData.CURRENT_SKIN_OBJECT_NAME, `${this.currentSkin}`);
  }

  /**
   * getter for the skin
   *
   * @returns the skin
   */
  public getSkins(): { src: string, id: number }[] {
    return this.skins;
  }

  /**
   * getter for the skin the player is currently using
   *
   * @returns the current skin of the player
   */
  public getCurrentSkin(): { src: string, id: number, name: string } {
    return this.skins[this.currentSkin];
  }

  /**
   * the getter for the players story progress
   *
   * @returns the storyprogress
   */
  public getStoryProgress(): { nPCs: { name: string, talkedTo: boolean, finished: boolean }[] } {
    return this.storyProgress;
  }

  /**
   * getter for the storyprogress of a npc
   *
   * @param name Name of the NPC
   * @returns the storyprogress after you talked to a npc
   */
  public getNPCStoryProgress(name: string): { name: string, talkedTo: boolean, finished: boolean } {
    const nPCData = this.storyProgress.nPCs.filter((nPC) => nPC.name === name)[0];
    if (nPCData) return nPCData;

    this.changeNPCStoryProgress({ name, talkedTo: false, finished: false });

    return { name, talkedTo: false, finished: false };
  }

  /**
   * @param nPCStoryProgress storyprogress array for the npc
   * @param nPCStoryProgress.name the name of the npc
   * @param nPCStoryProgress.talkedTo if you talked to the npc or not
   * @param nPCStoryProgress.finished if you have finished the game or not
   */
  public changeNPCStoryProgress(nPCStoryProgress: { name: string,
    talkedTo: boolean,
    finished: boolean,
  }): void {
    const newNPCArray = this.storyProgress.nPCs.filter((nPC) => nPC.name !== nPCStoryProgress.name);
    newNPCArray.push(nPCStoryProgress);
    this.storyProgress.nPCs = newNPCArray;
    localStorage.setItem(UserData.STORY_PROGRESS_OBJECT_NAME, JSON.stringify(this.storyProgress));
  }

  /**
   * getter for the soundprocent
   *
   * @param name name of the sound file
   * @returns 100
   */
  public getSoundProcent(name: string): number {
    const soundData = this.sounds.filter((sound) => sound.name === name)[0];
    if (soundData) return soundData.procent;

    this.changeSoundProcent(name, 100);
    return 100;
  }

  /**
   * @param name name of the sound file
   * @param procent the persentage of the volume
   */
  public changeSoundProcent(name: string, procent: number): void {
    const newSoundArray = this.sounds.filter((sound) => sound.name !== name);
    newSoundArray.push({ name, procent });
    this.sounds = newSoundArray;
    localStorage.setItem(UserData.SOUND_OBJECT_NAME, JSON.stringify(this.sounds));
  }
}
