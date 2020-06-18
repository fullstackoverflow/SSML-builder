export declare enum Level {
    STRONG = "strong",
    MODERATE = "moderate",
    REDUCED = "reduced"
}
export declare enum Strengths {
    NONE = "none",
    X_WEAk = "x-weak",
    WEAK = "weak",
    MEDIUM = "medium",
    STRONG = "strong",
    X_STRONG = "x-strong"
}
export declare enum Interpret {
    CHARACTERS = "characters",
    SPELL_OUT = "spell-out",
    CARDINAL = "cardinal",
    NUMBER = "number",
    ORDINAL = "ordinal",
    DIGITS = "digits",
    FRACTION = "fraction",
    UNIT = "unit",
    DATA = "date",
    TIME = "time",
    TELEPHONE = "telephone",
    ADDRESS = "address",
    INTERJECTION = "interjection",
    EXPLETIVE = "expletive"
}
export declare class Builder {
    private elements;
    private isInList;
    private validateDuration;
    private escape;
    say(words: string): this;
    paragraph(paragraph: string): this;
    sentence(words: string): this;
    pause(duration: number): this;
    pauseByStrength(strength: Strengths): this;
    spell(word: string): this;
    spellSlowly(word: string, delay: number): this;
    sayAs(options: {
        word: string;
        interpret: Interpret;
        format: string;
    }): this;
    partOfSpeech(options: {
        word: string;
        role: string;
    }): this;
    phoneme(alphabet: string, ph: string, word: string): this;
    emphasis(level: Level, word: string): this;
    sayWithSSML(saying: string): this;
    prosody(word: string): this;
    sub(alias: string, word: string): this;
    ssml(excludeSpeakTag?: boolean): string;
}
