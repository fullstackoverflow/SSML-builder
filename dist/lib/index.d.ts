export declare class Builder {
    private elements;
    private isInList;
    private validateDuration;
    private escape;
    say(words: string): this;
    paragraph(paragraph: string): this;
    sentence(words: string): this;
    pause(duration: number): this;
    pauseByStrength(strength: string): this;
    spell(word: string): this;
    spellSlowly(word: string, delay: number): this;
    sayAs(options: {
        word: string;
        interpret: string;
        format: string;
    }): this;
    partOfSpeech(options: {
        word: string;
        role: string;
    }): this;
    phoneme(alphabet: string, ph: string, word: string): this;
    emphasis(level: number, word: string): this;
    sayWithSSML: (saying: any) => any;
    prosody(word: string): this;
    sub(alias: string, word: string): this;
    ssml(excludeSpeakTag?: boolean): string;
}
