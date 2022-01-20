export default class PokeTaleInfo {
    static PLAYER_Y_SPEED = 9;
    static PLAYER_X_SPEED = 9;
    static WIN_SCORE = 10;
    static WIN_SOUND_VOLUME = 3 / 5;
    static SCORE_TEXT_X_POS = 1 / 2;
    static SCORE_TEXT_Y_POS = 1 / 20;
    static SCORE_TEXT_FONT_SIZE = 1 / 50;
    static POKE_TALE_PROGRESS_OBJECT_NAME = 'poke';
    static PROMPTS = [
        { prompt: 'Ghostleh probeert je uit te lokken.', moves: [
                { move: 'negeren', correct: true },
                { move: 'weglopen', correct: false },
                { move: 'slaan', correct: false },
                { move: 'boos worden', correct: false }
            ],
            promptInfo: 'Wanneer je de uitlokker negeert krijgt hij geen plezier van het irriteren, waardoor hij stopt',
            id: 1
        },
        { prompt: 'Ghostleh is je belachelijk aan het maken.', moves: [
                { move: 'boos worden', correct: false },
                { move: 'bedanken', correct: false },
                { move: 'slaan', correct: true },
                { move: 'negeren', correct: false }
            ],
            promptInfo: 'Door geen aandacht te geven haalt de pester hier geen plezier uit, waardoor hij stopt',
            id: 2
        },
        { prompt: 'Ghostleh zegt dat hij je credit-card gegevens wilt hebben.', moves: [
                { move: 'gegevens geven', correct: false },
                { move: 'niet geven', correct: true },
                { move: 'online zetten', correct: false },
                { move: 'Gegevens van mama geven', correct: false }
            ],
            promptInfo: 'Je moet nooit je credit-card gegevens aan andere mensen geven',
            id: 3
        },
        { prompt: 'Ghostleh biedt je een snoepje aan.', moves: [
                { move: 'aanemen', correct: false },
                { move: 'niet aanemen', correct: true },
                { move: 'bedanken', correct: false },
                { move: 'wegrennen', correct: false }
            ],
            promptInfo: 'Neem nooit snoep aan van vreemden',
            id: 4
        },
        { prompt: 'Ghostleh zegt dat je aardig bent', moves: [
                { move: 'bedanken', correct: true },
                { move: 'boos worden', correct: false },
                { move: 'terug complimenteren', correct: true },
                { move: 'be tsun about it', correct: false }
            ],
            promptInfo: 'Je krijgt een compliment, het zou dan aardig zijn om te bedanken of terug te complimenteren',
            id: 5
        },
    ];
}
