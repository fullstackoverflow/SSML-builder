"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Level;
(function (Level) {
    Level["STRONG"] = "strong";
    Level["MODERATE"] = "moderate";
    Level["REDUCED"] = "reduced";
})(Level = exports.Level || (exports.Level = {}));
var Strengths;
(function (Strengths) {
    Strengths["NONE"] = "none";
    Strengths["X_WEAk"] = "x-weak";
    Strengths["WEAK"] = "weak";
    Strengths["MEDIUM"] = "medium";
    Strengths["STRONG"] = "strong";
    Strengths["X_STRONG"] = "x-strong";
})(Strengths = exports.Strengths || (exports.Strengths = {}));
var Interpret;
(function (Interpret) {
    Interpret["CHARACTERS"] = "characters";
    Interpret["SPELL_OUT"] = "spell-out";
    Interpret["CARDINAL"] = "cardinal";
    Interpret["NUMBER"] = "number";
    Interpret["ORDINAL"] = "ordinal";
    Interpret["DIGITS"] = "digits";
    Interpret["FRACTION"] = "fraction";
    Interpret["UNIT"] = "unit";
    Interpret["DATA"] = "date";
    Interpret["TIME"] = "time";
    Interpret["TELEPHONE"] = "telephone";
    Interpret["ADDRESS"] = "address";
    Interpret["INTERJECTION"] = "interjection";
    Interpret["EXPLETIVE"] = "expletive";
})(Interpret = exports.Interpret || (exports.Interpret = {}));
class Builder {
    constructor() {
        this.elements = [];
    }
    isInList(value, listOfValues, msg) {
        value = value.toLowerCase().trim();
        if (listOfValues.indexOf(value) === -1) {
            throw new Error(msg);
        }
    }
    validateDuration(duration) {
        const str = duration.toString();
        var re = /^(\d*\.?\d+)(s|ms)$/;
        if (str.match(re)) {
            var parts = re.exec(str);
            var pauseDuration = parts[1];
            var pauseType = parts[2];
            if (pauseType.toLowerCase() === 's' && Number(pauseDuration) > 10) {
                throw "The pause duration exceeds the allowed 10 second duration. Duration provided: " + duration;
            }
            else if (Number(pauseDuration) > 10000) {
                throw "The pause duration exceeds the allowed 10,000 milliseconds duration. Duration provided: " + duration;
            }
        }
        else {
            throw "The duration must be a number followed by either 's' for second or 'ms' for milliseconds. e.g., 10s or 100ms. Max duration is 10 seconds (10000 milliseconds).";
        }
    }
    ;
    escape(word) {
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
    }
    ;
    say(words) {
        this.elements.push(this.escape(words));
        return this;
    }
    paragraph(paragraph) {
        this.elements.push("<p>" + this.escape(paragraph) + "</p>");
        return this;
    }
    ;
    sentence(words) {
        this.elements.push("<s>" + this.escape(words) + "</s>");
        return this;
    }
    ;
    pause(duration) {
        this.validateDuration(duration);
        this.elements.push("<break time='" + duration.toString() + "'/>");
        return this;
    }
    ;
    pauseByStrength(strength) {
        this.elements.push("<break strength='" + strength + "'/>");
        return this;
    }
    ;
    spell(word) {
        this.elements.push("<say-as interpret-as='spell-out'>" + this.escape(word) + "</say-as>");
        return this;
    }
    ;
    spellSlowly(word, delay) {
        for (var i = 0; i < word.length; i++) {
            this.elements.push("<say-as interpret-as='spell-out'>" + this.escape(word.charAt(i)) + "</say-as>");
            this.pause(delay);
        }
        return this;
    }
    ;
    sayAs(options) {
        if (options.interpret) {
            if (options.format) {
                this.elements.push("<say-as interpret-as=\'" + options.interpret + "\'" + " format=\'" + options.format + "'>" + options.word + "</say-as>");
                return this;
            }
            this.elements.push("<say-as interpret-as=\'" + options.interpret + "'>" + options.word + "</say-as>");
            return this;
        }
        else {
            this.elements.push(options.word);
            return this;
        }
    }
    ;
    partOfSpeech(options) {
        var word = this.escape(options.word);
        if (options.role) {
            this.elements.push("<w role=\'" + options.role + "'>" + word + "</w>");
        }
        return this;
    }
    ;
    phoneme(alphabet, ph, word) {
        var escapedWord = this.escape(word);
        if (ph.indexOf("'") !== -1) {
            ph = ph.replace(/'/g, '&apos;');
        }
        this.elements.push("<phoneme alphabet=\'" + alphabet + "\'" + " ph=\'" + ph + "'>" + escapedWord + "</phoneme>");
        return this;
    }
    ;
    emphasis(level, word) {
        this.elements.push("<emphasis level='" + level + "'>" + this.escape(word) + "</emphasis>");
        return this;
    }
    ;
    sayWithSSML(saying) {
        this.elements.push(saying);
        return this;
    }
    ;
    prosody(word) {
        var final = "<prosody";
        final += ">" + this.escape(word) + "</prosody>";
        this.elements.push(final);
        return this;
    }
    ;
    sub(alias, word) {
        this.elements.push("<sub alias='" + alias + "'>" + this.escape(word) + "</sub>");
        return this;
    }
    ;
    ssml(excludeSpeakTag) {
        if (excludeSpeakTag) {
            return this.elements.join("");
        }
        return "<speak>" + this.elements.join("") + "</speak>";
    }
    ;
}
exports.Builder = Builder;
//# sourceMappingURL=index.js.map