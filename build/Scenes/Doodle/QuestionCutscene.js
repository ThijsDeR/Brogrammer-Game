import CutScene from '../../CutScene.js';
import Game from '../../Game.js';
import KeyboardListener from '../../KeyboardListener.js';
import Question from '../../Props/Question.js';
export default class QuestionCutscene extends CutScene {
    doodleNPC;
    textBox;
    endTextBox;
    question = Question;
    constructor(canvas, userData, question) {
        super(canvas, userData);
        question = question;
        const questions = [
            { question: 'Wat is de sterkste pincode?', answers: [
                    { answer: '0000', correct: false },
                    { answer: '123456', correct: false },
                    { answer: '472810', correct: true },
                    { answer: '2009', correct: false }
                ],
                questionInfo: 'Een Goede pincode is lang en onvoorspelbaar',
            },
            { question: 'Hoe veilig is openbare wifi?', answers: [
                    { answer: 'Veilig zolang er een wachtwoord op zit', correct: false },
                    { answer: 'Erg onveilig, zelfs met een wachtwoord', correct: true },
                    { answer: 'Veilig, want je beveiliging op je mobiel of pc is genoeg', correct: false },
                    { answer: 'Veilig zolang er geen privé gegevens worden gedeeld', correct: false }
                ],
                questionInfo: 'Openbare wifi is erg onveilig, zelfs met een wachtwoord kan een hacker gemakkelijk bij gegevens',
            },
            { question: 'Wat kun je doen om je privacy en veiligheid te verbeteren op sociale media?', answers: [
                    { answer: 'Door goed na te denken voordat je iets online zet', correct: true },
                    { answer: "Door foto's van anderen te rapporteren", correct: false },
                    { answer: 'Door je locatie aan te zetten tijdens het gebruiken van sociale media', correct: false },
                    { answer: 'Door anderen het wachtwoord te geven van je account', correct: false }
                ],
                questionInfo: 'Denk na, realiseer voordat je iets plaats dat al je volgers dat kunnen zien',
            },
            { question: 'Wat doe je als een onbekend persoon je wilt volgen op Instagram?', answers: [
                    { answer: 'Accepteren, het kan geen kwaad', correct: false },
                    { answer: 'Niet accepteren, want er staat persoonlijke informatie op je account', correct: true },
                    { answer: 'Niet accepteren, want dan kunnen ze gemakkelijk je account stelen', correct: false },
                    { answer: 'Niet van toepassing, mijn account staat op openbaar', correct: false }
                ],
                questionInfo: 'Kijk uit met wie je laat volgen, omdat er veel informatie over jou op je account staat',
            },
            { question: "Kunnen alle foto's die je online zet door iedereen worden gezien?", answers: [
                    { answer: 'Nee, het internet is veilig', correct: false },
                    { answer: 'Nee, er kan toch niks gebeuren', correct: false },
                    { answer: 'Alleen als je een openbaar profiel hebt', correct: false },
                    { answer: 'Ja, zelfs met een prive account', correct: true }
                ],
                questionInfo: "Foto's die je plaatst, zijn openbaar, want mensen die je volgen kunnen die foto gebruiken of delen",
            },
            { question: 'Wat is een sterk wachtwoord?', answers: [
                    { answer: '!1Instagram', correct: false },
                    { answer: '#Ui*%78Qne!p', correct: true },
                    { answer: 'QWERTY123', correct: false },
                    { answer: 'Appelflapje', correct: false }
                ],
                questionInfo: 'Een goed wachtwoord is onvoorspelbaar, let op dat het niet op de volgorde van het toetsenbord is',
            },
            { question: 'Wat doe je met een foto op Instagram van jou waar geen toestemming voor is gegeven?', answers: [
                    { answer: 'Je vraagt aan de uploader of diegene de foto offline wilt halen', correct: false },
                    { answer: 'Je rapporteert de foto', correct: true },
                    { answer: 'Je doet niks', correct: false },
                    { answer: 'Ik geef de foto een like', correct: false }
                ],
                questionInfo: 'Een foto van iemand uploaden zonder toestemming is illegaal',
            },
            { question: 'Wat doe je als een onbekende jou online vraagt om je echte naam?', answers: [
                    { answer: 'Ik geef alleen mijn naam als ik al langer met diegene praat', correct: false },
                    { answer: 'Ik geef mijn naam, als de onbekende ook zijn/haar naam heeft gegeven', correct: false },
                    { answer: 'Ik zeg mijn naam, want het kan toch geen kwaad', correct: false },
                    { answer: 'Ik zeg niet mijn echte naam om veilig te blijven', correct: true }
                ],
                questionInfo: 'Blijf veilig, deel geen privé gegevens zoals je naam of adres',
            },
            { question: 'Waarom mag je op Facebook geen account maken als je nog geen 16 jaar bent?', answers: [
                    { answer: 'Facebook heeft andere apps voor kinderen', correct: false },
                    { answer: 'Facebook vindt dat kinderen buiten moeten spelen voor hun 16e', correct: false },
                    { answer: 'Facebook is eigenlijk alleen voor volwassenen bedoeld', correct: false },
                    { answer: 'Er zijn Europese regels voor de minimale leeftijd voor sociale media', correct: true }
                ],
                questionInfo: 'Europese regels beschermen de privacy van kinderen online',
            },
            { question: 'Wat doe je als een onbekende een vriendschapsverzoek stuurt?', answers: [
                    { answer: 'Het account van de onbekende bekijken en dan accepteren of niet', correct: false },
                    { answer: 'Accepteren', correct: false },
                    { answer: 'Niet accepteren', correct: true },
                    { answer: 'Niet van toepassing, iedereen kan mij volgen', correct: false }
                ],
                questionInfo: 'Het is verstandig om je account op prive te zetten, zodat je kan controleren wie je wilt volgen',
            },
            { question: 'Is het handig om voor elk account hetzelfde wachtwoord te gebruiken?', answers: [
                    { answer: 'Nee', correct: true },
                    { answer: 'Ja', correct: false }
                ],
                questionInfo: 'Als je wachtwoord hetzelfde is op meerdere accounts heeft de hacker gelijk toegang tot al je accounts.',
            },
        ];
        let randomQuestion = Game.randomNumber(0, questions.length);
        let textArray = [];
        textArray.push(questions[randomQuestion].question);
        for (let i = 0; i < questions[randomQuestion].answers.length; i++) {
            textArray.push(questions[randomQuestion].answers[i].answer);
        }
        textArray.push(questions[randomQuestion].questionInfo);
        console.log(textArray);
    }
    draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.doodleNPC.getImage(), 0, 0, this.canvas.width / 4, this.canvas.height);
        this.textBox.draw(this.ctx);
    }
    processInput() {
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.textBox.nextSentence();
        }
    }
    update(elapsed) {
        this.textBox.advanceSentence(elapsed);
        if (this.textBox.isDone()) {
            this.doodleNPC.finishInteraction();
            this.textBox = this.endTextBox;
            this.textBox.reset();
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=QuestionCutscene.js.map