export default class UserData {
    static COIN_OBJECT_NAME = 'coins';
    static QUESTIONS_OBJECT_NAME = 'questions';
    coins;
    questions;
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
        this.questions.push(question);
        localStorage.setItem(UserData.QUESTIONS_OBJECT_NAME, JSON.stringify(this.questions));
    }
    getQuestions() {
        return this.questions;
    }
}
//# sourceMappingURL=UserData.js.map