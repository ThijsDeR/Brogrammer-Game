import GameInfo from "./GameInfo.js";
export default class UserData {
    static COIN_OBJECT_NAME = 'coins';
    static QUESTIONS_OBJECT_NAME = 'questions';
    static SKINS_OBJECT_NAME = 'skins';
    static CURRENT_SKIN_OBJECT_NAME = 'current_skin';
    static STORY_PROGRESS_OBJECT_NAME = 'story_progress';
    coins;
    questions;
    skins;
    currentSkin;
    storyProgress;
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
                { src: GameInfo.IMG_PATH + 'Sam_Suong/robot-preview.png', id: 0, name: 'Normale Robot' }
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
            this.storyProgress = { NPCs: [] };
            localStorage.setItem(UserData.STORY_PROGRESS_OBJECT_NAME, JSON.stringify(this.storyProgress));
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
        const NPCData = this.storyProgress.NPCs.filter((NPC) => NPC.name === name)[0];
        if (NPCData)
            return NPCData;
        else {
            this.changeNPCStoryProgress({ name: name, talkedTo: false, finished: false });
            return { name: name, talkedTo: false, finished: false };
        }
    }
    changeNPCStoryProgress(NPCStoryProgress) {
        const newNPCArray = this.storyProgress.NPCs.filter((NPC) => NPC.name !== NPCStoryProgress.name);
        newNPCArray.push(NPCStoryProgress);
        this.storyProgress.NPCs = newNPCArray;
        localStorage.setItem(UserData.STORY_PROGRESS_OBJECT_NAME, JSON.stringify(this.storyProgress));
    }
}
