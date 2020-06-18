export enum Level {
    STRONG = 'strong',
    MODERATE = 'moderate',
    REDUCED = 'reduced'
}

export enum Strengths {
    NONE = 'none',
    X_WEAk = 'x-weak',
    WEAK = 'weak',
    MEDIUM = 'medium',
    STRONG = 'strong',
    X_STRONG = 'x-strong'
}

export enum Interpret {
    CHARACTERS = 'characters',
    SPELL_OUT = 'spell-out',
    CARDINAL = 'cardinal',
    NUMBER = 'number',
    ORDINAL = 'ordinal',
    DIGITS = 'digits',
    FRACTION = 'fraction',
    UNIT = 'unit',
    DATA = 'date',
    TIME = 'time',
    TELEPHONE = 'telephone',
    ADDRESS = 'address',
    INTERJECTION = 'interjection',
    EXPLETIVE = 'expletive'
}

export class Builder {
    private elements: string[] = [];

    private isInList(value: string, listOfValues: string[], msg: string) {
        value = value.toLowerCase().trim();
        if (listOfValues.indexOf(value) === -1) {
            throw new Error(msg);
        }
    }

    private validateDuration(duration: number) {
        const str = duration.toString();
        var re = /^(\d*\.?\d+)(s|ms)$/;
        if (str.match(re)) {
            var parts = re.exec(str);
            var pauseDuration = parts[1];
            var pauseType = parts[2];
            if (pauseType.toLowerCase() === 's' && Number(pauseDuration) > 10) {
                throw "The pause duration exceeds the allowed 10 second duration. Duration provided: " + duration;
            } else if (Number(pauseDuration) > 10000) {
                throw "The pause duration exceeds the allowed 10,000 milliseconds duration. Duration provided: " + duration;
            }
        } else {
            throw "The duration must be a number followed by either 's' for second or 'ms' for milliseconds. e.g., 10s or 100ms. Max duration is 10 seconds (10000 milliseconds)."
        }
    };


    private escape(word: string) {
        if (typeof (word) === "string") {
            word = word.replace(/&/g, '&amp;');
            word = word.replace(/</g, '&lt;');
            word = word.replace(/>/g, '&gt;');
            word = word.replace(/"/g, '&quot;');
            word = word.replace(/'/g, '&apos;');
            return word;
        }
        if (typeof (word) === "number") {
            return word;
        }
        if (typeof (word) === "boolean") {
            return word;
        }
        throw new Error('received invalid type ' + typeof (word));
    };

    say(words: string) {
        this.elements.push(this.escape(words));
        return this;
    }

    paragraph(paragraph: string) {
        this.elements.push("<p>" + this.escape(paragraph) + "</p>");
        return this;
    };

    sentence(words: string) {
        this.elements.push("<s>" + this.escape(words) + "</s>");
        return this;
    };

    pause(duration: number) {
        this.validateDuration(duration);
        this.elements.push("<break time='" + duration.toString() + "'/>");
        return this;
    };

    pauseByStrength(strength: Strengths) {
        this.elements.push("<break strength='" + strength + "'/>");
        return this;
    };

    spell(word: string) {
        this.elements.push("<say-as interpret-as='spell-out'>" + this.escape(word) + "</say-as>");
        return this;
    };

    spellSlowly(word: string, delay: number) {
        for (var i = 0; i < word.length; i++) {
            this.elements.push("<say-as interpret-as='spell-out'>" + this.escape(word.charAt(i)) + "</say-as>");
            this.pause(delay);
        }
        return this;
    };

    sayAs(options: { word: string, interpret: Interpret, format: string }) {
        if (options.interpret) {
            if (options.format) {
                this.elements.push("<say-as interpret-as=\'" + options.interpret + "\'" + " format=\'" + options.format + "'>" + options.word + "</say-as>");
                return this;
            }
            this.elements.push("<say-as interpret-as=\'" + options.interpret + "'>" + options.word + "</say-as>");
            return this;
        } else {
            this.elements.push(options.word);
            return this;
        }
    };

    partOfSpeech(options: { word: string, role: string }) {
        var word = this.escape(options.word);
        if (options.role) {
            this.elements.push("<w role=\'" + options.role + "'>" + word + "</w>")
        }
        return this;
    };

    phoneme(alphabet: string, ph: string, word: string) {
        var escapedWord = this.escape(word);
        if (ph.indexOf("'") !== -1) {
            ph = ph.replace(/'/g, '&apos;')
        }
        this.elements.push("<phoneme alphabet=\'" + alphabet + "\'" + " ph=\'" + ph + "'>" + escapedWord + "</phoneme>");
        return this;
    };

    emphasis(level: Level, word: string) {
        this.elements.push("<emphasis level='" + level + "'>" + this.escape(word) + "</emphasis>");
        return this;
    };

    sayWithSSML(saying: string) {
        this.elements.push(saying);
        return this;
    };

    prosody(word: string) {
        var final = "<prosody";
        final += ">" + this.escape(word) + "</prosody>";
        this.elements.push(final);
        return this;
    };

    sub(alias: string, word: string) {
        this.elements.push("<sub alias='" + alias + "'>" + this.escape(word) + "</sub>");
        return this;
    };

    ssml(excludeSpeakTag?: boolean) {
        if (excludeSpeakTag) {
            return this.elements.join("");
        }
        return "<speak>" + this.elements.join("") + "</speak>";
    };
}