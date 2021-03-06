import GameInfo from './GameInfo.js';
export default class UserData {
    static COIN_OBJECT_NAME = 'coins';
    static QUESTIONS_OBJECT_NAME = 'questions';
    static SKINS_OBJECT_NAME = 'skins';
    static CURRENT_SKIN_OBJECT_NAME = 'current_skin';
    static STORY_PROGRESS_OBJECT_NAME = 'story_progress';
    static MASTER_SOUND_OBJECT_NAME = 'master_sound';
    static MUSIC_SOUND_OBJECT_NAME = 'music_sound';
    static UI_SOUND_OBJECT_NAME = 'ui_sound';
    static SOUND_OBJECT_NAME = 'sound';
    coins;
    questions;
    skins;
    currentSkin;
    storyProgress;
    sounds;
    constructor() {
        if (localStorage.getItem(UserData.COIN_OBJECT_NAME)) {
            this.coins = Number(localStorage.getItem(UserData.COIN_OBJECT_NAME));
        }
        else {
            this.coins = 0;
            localStorage.setItem(UserData.COIN_OBJECT_NAME, `${this.coins}`);
        }
        if (localStorage.getItem(UserData.QUESTIONS_OBJECT_NAME)) {
            this.questions = JSON.parse(localStorage.getItem(UserData.QUESTIONS_OBJECT_NAME));
        }
        else {
            this.questions = [];
            localStorage.setItem(UserData.QUESTIONS_OBJECT_NAME, JSON.stringify(this.questions));
        }
        if (localStorage.getItem(UserData.SKINS_OBJECT_NAME)) {
            this.skins = JSON.parse(localStorage.getItem(UserData.SKINS_OBJECT_NAME));
        }
        else {
            this.skins = [
                { src: `${GameInfo.IMG_PATH}Sam_Suong/robot-preview.png`, id: 0, name: 'Normale Robot' },
            ];
            localStorage.setItem(UserData.SKINS_OBJECT_NAME, JSON.stringify(this.skins));
        }
        if (localStorage.getItem(UserData.CURRENT_SKIN_OBJECT_NAME)) {
            this.currentSkin = Number(localStorage.getItem(UserData.CURRENT_SKIN_OBJECT_NAME));
        }
        else {
            this.currentSkin = 0;
            localStorage.setItem(UserData.CURRENT_SKIN_OBJECT_NAME, `${this.currentSkin}`);
        }
        if (localStorage.getItem(UserData.STORY_PROGRESS_OBJECT_NAME)) {
            this.storyProgress = JSON.parse(localStorage.getItem(UserData.STORY_PROGRESS_OBJECT_NAME));
        }
        else {
            this.storyProgress = { nPCs: [] };
            localStorage.setItem(UserData.STORY_PROGRESS_OBJECT_NAME, JSON.stringify(this.storyProgress));
        }
        if (localStorage.getItem(UserData.SOUND_OBJECT_NAME)) {
            this.sounds = JSON.parse(localStorage.getItem(UserData.SOUND_OBJECT_NAME));
        }
        else {
            this.sounds = [];
            localStorage.setItem(UserData.SOUND_OBJECT_NAME, JSON.stringify(this.sounds));
        }
    }
    getCoins() {
        return this.coins;
    }
    increaseCoins(amount) {
        this.coins += amount;
        localStorage.setItem(UserData.COIN_OBJECT_NAME, `${this.coins}`);
    }
    decreaseCoins(amount) {
        this.coins -= amount;
        localStorage.setItem(UserData.COIN_OBJECT_NAME, `${this.coins}`);
    }
    addQuestion(question) {
        let shouldAdd = true;
        this.questions.forEach((existingQuestion) => {
            if (existingQuestion.id === question.id)
                shouldAdd = false;
        });
        if (shouldAdd) {
            this.questions.push(question);
            this.questions.sort((firstEl, secondEl) => firstEl.id - secondEl.id);
            localStorage.setItem(UserData.QUESTIONS_OBJECT_NAME, JSON.stringify(this.questions));
        }
    }
    getQuestions() {
        return this.questions;
    }
    addSkin(skin) {
        this.skins.push(skin);
        this.skins.sort((firstEl, secondEl) => firstEl.id - secondEl.id);
        localStorage.setItem(UserData.SKINS_OBJECT_NAME, JSON.stringify(this.skins));
    }
    decreaseCurrentSkin() {
        this.changeCurrentSkin(this.currentSkin - 1);
    }
    increaseCurrentSkin() {
        this.changeCurrentSkin(this.currentSkin + 1);
    }
    changeCurrentSkin(skinIndex) {
        if (skinIndex > this.skins.length - 1)
            this.currentSkin = 0;
        else if (skinIndex < 0)
            this.currentSkin = this.skins.length - 1;
        else
            this.currentSkin = skinIndex;
        localStorage.setItem(UserData.CURRENT_SKIN_OBJECT_NAME, `${this.currentSkin}`);
    }
    getSkins() {
        return this.skins;
    }
    getCurrentSkin() {
        return this.skins[this.currentSkin];
    }
    getStoryProgress() {
        return this.storyProgress;
    }
    getNPCStoryProgress(name) {
        const nPCData = this.storyProgress.nPCs.filter((nPC) => nPC.name === name)[0];
        if (nPCData)
            return nPCData;
        this.changeNPCStoryProgress({ name, talkedTo: false, finished: false });
        return { name, talkedTo: false, finished: false };
    }
    changeNPCStoryProgress(nPCStoryProgress) {
        const newNPCArray = this.storyProgress.nPCs.filter((nPC) => nPC.name !== nPCStoryProgress.name);
        newNPCArray.push(nPCStoryProgress);
        this.storyProgress.nPCs = newNPCArray;
        localStorage.setItem(UserData.STORY_PROGRESS_OBJECT_NAME, JSON.stringify(this.storyProgress));
    }
    getSoundProcent(name) {
        const soundData = this.sounds.filter((sound) => sound.name === name)[0];
        if (soundData)
            return soundData.procent;
        this.changeSoundProcent(name, 100);
        return 100;
    }
    changeSoundProcent(name, procent) {
        const newSoundArray = this.sounds.filter((sound) => sound.name !== name);
        newSoundArray.push({ name, procent });
        this.sounds = newSoundArray;
        localStorage.setItem(UserData.SOUND_OBJECT_NAME, JSON.stringify(this.sounds));
    }
    reset() {
        this.coins = 0;
        localStorage.setItem(UserData.COIN_OBJECT_NAME, `${this.coins}`);
        this.questions = [];
        localStorage.setItem(UserData.QUESTIONS_OBJECT_NAME, JSON.stringify(this.questions));
        this.skins = [
            { src: `${GameInfo.IMG_PATH}Sam_Suong/robot-preview.png`, id: 0, name: 'Normale Robot' },
        ];
        localStorage.setItem(UserData.SKINS_OBJECT_NAME, JSON.stringify(this.skins));
        this.currentSkin = 0;
        localStorage.setItem(UserData.CURRENT_SKIN_OBJECT_NAME, `${this.currentSkin}`);
        this.storyProgress = { nPCs: [] };
        localStorage.setItem(UserData.STORY_PROGRESS_OBJECT_NAME, JSON.stringify(this.storyProgress));
        this.sounds = [];
        localStorage.setItem(UserData.SOUND_OBJECT_NAME, JSON.stringify(this.sounds));
    }
}
