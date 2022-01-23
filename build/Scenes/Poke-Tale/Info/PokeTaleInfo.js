export default class PokeTaleInfo {
    static PLAYER_Y_SPEED = 9;
    static PLAYER_X_SPEED = 9;
    static PLAYER_HEALTH = 100;
    static ENEMY_HEALTH = 50;
    static WIN_SCORE = 3;
    static WIN_COIN_AMOUNT = 10;
    static COMPLETE_SCORE_AWARD = 100;
    static WIN_SOUND_VOLUME = 3 / 5;
    static BACKGROUND_MUSIC_VOLUME = 1 / 20;
    static CORRECT_SOUND_VOLUME = 3 / 5;
    static WRONG_SOUND_VOLUME = 4 / 5;
    static SCORE_TEXT_X_POS = 1 / 2;
    static SCORE_TEXT_Y_POS = 1 / 20;
    static SCORE_TEXT_FONT_SIZE = 1 / 50;
    static POKE_TALE_PROGRESS_OBJECT_NAME = 'poke';
    static PROMPTS = [
        {
            prompt: 'Ghostleh probeert je uit te lokken.',
            moves: [
                { move: 'Negeren', correct: true },
                { move: 'Weglopen', correct: true },
                { move: 'Slaan', correct: false },
                { move: 'Boos worden', correct: false }
            ],
            promptInfo: 'Wanneer je de uitlokker negeert krijgt hij geen plezier van het irriteren, waardoor hij stopt',
            id: 1,
        },
        {
            prompt: 'Ghostleh is je belachelijk aan het maken.',
            moves: [
                { move: 'Boos worden', correct: false },
                { move: 'Bedanken', correct: false },
                { move: 'Sla hem', correct: false },
                { move: 'Negeren', correct: true }
            ],
            promptInfo: 'Door geen aandacht te geven haalt de pester hier geen plezier uit, waardoor hij stopt',
            id: 2,
        },
        {
            prompt: 'Ghostleh zegt dat hij je credit-card gegevens nodig heeft.',
            moves: [
                { move: 'Gegevens geven', correct: false },
                { move: 'Niet geven', correct: true },
                { move: 'Online zetten', correct: false },
                { move: 'Gegevens van mama geven', correct: false }
            ],
            promptInfo: 'Je moet nooit je credit-card gegevens aan andere mensen geven',
            id: 3,
        },
        {
            prompt: 'Ghostleh biedt je een snoepje aan.',
            moves: [
                { move: 'Aanemen', correct: false },
                { move: 'Niet aanemen', correct: true },
                { move: 'Bedanken', correct: false },
                { move: 'Wegrennen', correct: true }
            ],
            promptInfo: 'Neem nooit snoep aan van vreemden',
            id: 4,
        },
        {
            prompt: 'Ghostleh zegt dat je aardig bent',
            moves: [
                { move: 'Bedanken', correct: true },
                { move: 'Boos worden', correct: false },
                { move: 'Terug complimenteren', correct: true },
                { move: 'Weglopen', correct: false }
            ],
            promptInfo: 'Je krijgt een compliment, het zou dan aardig zijn om te bedanken of terug te complimenteren',
            id: 5,
        },
        {
            prompt: 'Ghostleh post een foto van je op instagram zonder je toestemming',
            moves: [
                { move: 'Vragen of hij de foto wilt verwijderen', correct: true },
                { move: 'De foto rapporteren', correct: true },
                { move: 'De foto accepteren en liken', correct: false },
                { move: 'Doorsturen', correct: false }
            ],
            promptInfo: 'Als er ongevraagd een foto word gepost rapporteer je de foto en sprrek je de persoon an',
            id: 6,
        },
        {
            prompt: 'Ghostleh weet je wachtwoord van TikTok! wat ga je doen?',
            moves: [
                { move: 'Het wachtwoord veranderen', correct: true },
                { move: 'Niks doen', correct: false },
                { move: 'Het account samen delen', correct: false },
                { move: 'Je account verwijderen', correct: false }
            ],
            promptInfo: 'Als iemand toegang heeft tot je account, verander dan direct het wachtwoord',
            id: 7,
        },
        {
            prompt: 'Ghostleh stuurt je een raar linkje op!',
            moves: [
                { move: 'Stuur de link door naar al je vrienden', correct: false },
                { move: 'Klik op de link', correct: false },
                { move: 'Negeer de link', correct: true },
                { move: 'Rapporteer de link', correct: true }
            ],
            promptInfo: 'Klik nooit op rare linkjes',
            id: 8,
        },
        {
            prompt: 'Ghostleh zegt dat hij 12 jaar oud is en een instagram account heeft',
            moves: [
                { move: 'Rapporteren', correct: true },
                { move: 'Accepteren', correct: false },
                { move: 'Niks doen', correct: false },
                { move: 'Chatten', correct: false }
            ],
            promptInfo: 'Als iemand zich voordoet als iemand anders moet je hem rapporteren',
            id: 9,
        },
        {
            prompt: 'Ghostleh vraagt of je hem geld kan voorschieten',
            moves: [
                { move: 'Je helpt hem', correct: false },
                { move: 'Je stuurt hem naar iemand anders', correct: false },
                { move: 'Je geeft hem geen geld', correct: true },
                { move: 'Je zegt dat je geen geld hebt', correct: true }
            ],
            promptInfo: 'Mensen geld voorschieten is een slecht idee',
            id: 10,
        },
        {
            prompt: 'Ghostleh stelt voor om een keer af te spreken',
            moves: [
                { move: 'Je spreekt niet af', correct: false },
                { move: 'Je spreekt af en nodigt een aantal vrienden uit', correct: false },
                { move: 'Je blokkeerd hem', correct: true },
                { move: 'Je spreekt af', correct: false }
            ],
            promptInfo: 'Ontmoet nooit vreemden van het internet',
            id: 11,
        },
    ];
}
