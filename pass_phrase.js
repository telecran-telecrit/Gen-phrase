//import * as random from 'random';
///import * as optparse from 'optparse';
///import * as sys from 'sys';
///import * as re from 're';
///import * as os from 'os';
//import * as math from 'math';
//import * as datetime from 'datetime';
//import * as string from 'string';

var os = require('os');
var path = require('path');
var sys = require('sys');
var fs = require('fs');
var optparse = require('optparse');
var random = Math.random;
var format = require ('string-format');
var re = RegExp;

var _pj;
var __LICENSE__, adjectives, args, nouns, options, parser, raw_input, rng, usage, verbs;
function _pj_snippets(container) {
    function in_es6(left, right) {
        if (((right instanceof Array) || ((typeof right) === "string"))) {
            return (right.indexOf(left) > (- 1));
        } else {
            if (((right instanceof Map) || (right instanceof Set) || (right instanceof WeakMap) || (right instanceof WeakSet))) {
                return right.has(left);
            } else {
                return (left in right);
            }
        }
    }
    container["in_es6"] = in_es6;
    return container;
}
_pj = {};
_pj_snippets(_pj);
__LICENSE__ = "\nThe MIT License (MIT)\n\nCopyright (c) 2012 Aaron Bassett, http://aaronbassett.com\n\nPermission is hereby granted, free of charge, to any person \nobtaining a copy of this software and associated documentation \nfiles (the \"Software\"), to deal in the Software without restriction, \nincluding without limitation the rights to use, copy, modify, \nmerge, publish, distribute, sublicense, and/or sell copies of the \nSoftware, and to permit persons to whom the Software is furnished \nto do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be \nincluded in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \u201cAS IS\u201d, WITHOUT WARRANTY OF ANY KIND, \nEXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES \nOF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND \nNONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT \nHOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER \nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR \nIN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n";

String.prototype.format = function (...replacers) {
    var i = 0, args = arguments;
//    return this.replace(/{}/g, function () {
//        return typeof args[i] != 'undefined' ? args[i++] : '';
//    });
    return format.apply(null, [this].concat(replacers));
};

const expanduser = text => text.replace(
  /^~([a-z]+|\/)/,
  (_, $1) => $1 === '/' ?
    os.homedir() : `${path.dirname(os.homedir())}/${$1}`
);

os.path = path;
os.path.expanduser = expanduser;

rng = {};
/*try {
    rng = random.SystemRandom;
} catch(e) {
    if ((e instanceof Error)) {
        sys.stderr.write("WARNING: System does not support cryptographically secure random number generator or you are using Python version < 2.4.\nContinuing with less-secure generator.\n");
        rng = random.Random;
    } else {
        throw e;
    }
}
if ((sys.version[0] === "3")) {
    raw_input = input;
}*/


rng.randint = function (min, max) {
   return Math.round((Math.random() * Math.abs(max - min)) + min);
};


function validate_options(options, args) {
    /*
    Given a set of command line options, performs various validation checks
    */
    var common_word_file_locations, wordfile;
    if ((options.num <= 0)) {
        sys.stderr.write("Little point running the script if you don't generate even a single passphrase.\n");
        process.exit(1);
    }
    if ((options.max_length < options.min_length)) {
        sys.stderr.write("The maximum length of a word can not be lesser then minimum length.\nCheck the specified settings.\n");
        process.exit(1);
    }
    if ((args.length >= 1)) {
        console.error("Too many arguments.");
        process.exit(5);
    }
    for (var word_type, _pj_c = 0, _pj_a = ["adjectives", "nouns", "verbs"], _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        word_type = _pj_a[_pj_c];
        wordfile = (options[word_type] || null);
        if ((wordfile !== null)) {
            if ((! fs.existsSync(os.path.abspath(wordfile)))) {
                sys.stderr.write("Could not open the specified {0} word file.\n".format(word_type));
                process.exit(1);
            }
        } else {
            common_word_file_locations = ["{0}.txt", "~/.pass-phrase/{0}.txt"];
            for (var loc, _pj_f = 0, _pj_d = common_word_file_locations, _pj_e = _pj_d.length; (_pj_f < _pj_e); _pj_f += 1) {
                loc = _pj_d[_pj_f];
                wordfile = loc.format(word_type);
                console.debug('wordfile ', wordfile);
                if (fs.existsSync(wordfile)) {
                    options[word_type] = wordfile;
                    break;
                }
            }
        }
        if (((options[word_type] || null) === null)) {
            console.error("Could not find {0} word file, or word file does not exist.\n".format(word_type));
            process.exit(1);
        }
    }
}
function leet(word) {
    var geek_letters, geek_word, l, letter;
    geek_letters = {"a": ["4", "@"], "b": ["8"], "c": ["("], "e": ["3"], "f": ["ph", "pH"], "g": ["9", "6"], "h": ["#"], "i": ["1", "!", "|"], "l": ["!", "|"], "o": ["0", "()"], "q": ["kw"], "s": ["5", "$"], "t": ["7"], "x": ["><"], "y": ["j"], "z": ["2"]};
    geek_word = "";
    for (var letter, _pj_c = 0, _pj_a = word, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        letter = _pj_a[_pj_c];
        l = letter.lower();
        if (_pj.in_es6(l, geek_letters)) {
            if (((rng().randint(1, 5) % 5) !== 0)) {
                letter = rng().choice(geek_letters[l]);
            }
        } else {
            if (((rng().randint(1, 10) % 10) !== 0)) {
                letter = letter.upper();
            }
        }
        geek_word += letter;
    }
    if (((word.slice((- 1)).lower() === "s") && ((rng().randint(1, 2) % 2) === 0))) {
        geek_word = (geek_word.slice(0, (- 1)) + "zz");
    }
    return geek_word;
}
function mini_leet(word) {
    var geek_letters, geek_word, l, letter;
    geek_letters = {"a": "4", "b": "8", "e": "3", "g": "6", "i": "1", "o": "0", "s": "5", "t": "7", "z": "2"};
    geek_word = "";
    for (var letter, _pj_c = 0, _pj_a = word, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        letter = _pj_a[_pj_c];
        l = letter.lower();
        if (_pj.in_es6(l, geek_letters)) {
            letter = geek_letters[l];
        }
        geek_word += letter;
    }
    return geek_word;
}
function generate_wordlist(wordfile = null, min_length = 0, max_length = 20, valid_chars = ".", make_leet = false, make_mini_leet = false) {
    /*
    Generate a word list from either a kwarg wordfile, or a system default
    valid_chars is a regular expression match condition (default - all chars)
    */
    var regexp, thisword, wlf, words;
    words = [];
    regexp = new re(("^%s{%i,%i}$" % [valid_chars, min_length, max_length]));
    wordfile = os.path.expanduser(wordfile);
    console.log('wordfile: ', wordfile);
    /*wlf = open(wordfile);
    for (var line, _pj_c = 0, _pj_a = wlf, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        line = _pj_a[_pj_c];
        thisword = line.strip();
        if (((thisword.find("_") >= 0) || (thisword.lower() !== thisword))) {
            continue;
        }
        if ((regexp.match(thisword) !== null)) {
            if (make_mini_leet) {
                thisword = mini_leet(thisword);
            } else {
                if (make_leet) {
                    thisword = leet(thisword);
                }
            }
            words.append(thisword);
        }
    }
    wlf.close();
    if ((words.length < 1)) {
        sys.stderr.write("Could not get enough words!\n");
        sys.stderr.write("This could be a result of either {0} being too small,\n".format(wordfile));
        sys.stderr.write("or your settings too strict.\n");
        process.exit(1);
    }*/
    return words;
}
function craking_time(seconds) {
    var day, days, hour, hours, minute, months, r, week, weeks, years;
    minute = 60;
    hour = (minute * 60);
    day = (hour * 24);
    week = (day * 7);
    if ((seconds < 60)) {
        return "less than a minute";
    } else {
        if ((seconds < (60 * 5))) {
            return "less than 5 minutes";
        } else {
            if ((seconds < (60 * 10))) {
                return "less than 10 minutes";
            } else {
                if ((seconds < (60 * 60))) {
                    return "less than an hour";
                } else {
                    if ((seconds < ((60 * 60) * 24))) {
                        [hours, r] = divmod(seconds, (60 * 60));
                        return ("about %i hours" % hours);
                    } else {
                        if ((seconds < (((60 * 60) * 24) * 14))) {
                            [days, r] = divmod(seconds, ((60 * 60) * 24));
                            return ("about %i days" % days);
                        } else {
                            if ((seconds < ((((60 * 60) * 24) * 7) * 8))) {
                                [weeks, r] = divmod(seconds, (((60 * 60) * 24) * 7));
                                return ("about %i weeks" % weeks);
                            } else {
                                if ((seconds < ((((60 * 60) * 24) * 365) * 2))) {
                                    [months, r] = divmod(seconds, ((((60 * 60) * 24) * 7) * 4));
                                    return ("about %i months" % months);
                                } else {
                                    [years, r] = divmod(seconds, (((60 * 60) * 24) * 365));
                                    return ("about %i years" % years);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
function verbose_reports(kwargs = {}) {
    /*
    Report entropy metrics based on word list size"
    */
    var combinations, entropy, f, time_taken, words;
    options = kwargs.pop("options");
    f = {};
    for (var word_type, _pj_c = 0, _pj_a = ["adjectives", "nouns", "verbs"], _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        word_type = _pj_a[_pj_c];
        console.log("The supplied {word_type} list is located at {loc}.".format({"word_type": word_type, "loc": os.path.abspath(options[word_type])}));
        words = kwargs[word_type];
        f[word_type] = {};
        f[word_type]["length"] = words.length;
        f[word_type]["bits"] = math.log(f[word_type]["length"], 2);
        if ((Number.parseInt(f[word_type]["bits"]) === f[word_type]["bits"])) {
            console.log(("Your %s word list contains %i words, or 2^%i words." % [word_type, f[word_type]["length"], f[word_type]["bits"]]));
        } else {
            console.log(("Your %s word list contains %i words, or 2^%0.2f words." % [word_type, f[word_type]["length"], f[word_type]["bits"]]));
        }
    }
    entropy = ((((f["adjectives"]["bits"] + f["nouns"]["bits"]) + f["verbs"]["bits"]) + f["adjectives"]["bits"]) + f["nouns"]["bits"]);
    console.log(("A passphrase from this list will have roughly %i (%0.2f + %0.2f + %0.2f + %0.2f + %0.2f) bits of entropy, " % [entropy, f["adjectives"]["bits"], f["nouns"]["bits"], f["verbs"]["bits"], f["adjectives"]["bits"], f["nouns"]["bits"]]));
    combinations = (math.pow(2, Number.parseInt(entropy)) / 1000);
    time_taken = craking_time(combinations);
    console.log(("Estimated time to crack this passphrase (at 1,000 guesses per second): %s\n" % time_taken));
}
function generate_passphrase(adjectives, nouns, verbs, separator) {
    return "{0}{s}{1}{s}{2}{s}{3}{s}{4}".format(rng().choice(adjectives), rng().choice(nouns), rng().choice(verbs), rng().choice(adjectives), rng().choice(nouns), {"s": separator});
}
function passphrase(adjectives, nouns, verbs, separator, num = 1, uppercase = false, lowercase = false, capitalise = false) {
    /*
    Returns a random pass-phrase made up of
    adjective noun verb adjective noun

    I find this basic structure easier to
    remember than XKCD style purely random words
    */
    var all_phrases, phrase, phrases;
    phrases = [];
    for (var i = 0, _pj_a = num; (i < _pj_a); i += 1) {
        phrase = generate_passphrase(adjectives, nouns, verbs, separator);
        if (capitalise) {
            phrase = string.capwords(phrase);
        }
        phrases.append(phrase);
    }
    all_phrases = phrases.join("\n");
    if (uppercase) {
        all_phrases = all_phrases.upper();
    } else {
        if (lowercase) {
            all_phrases = all_phrases.lower();
        }
    }
    return all_phrases;
}
/*if ((__name__ === "__main__")) {*/
    usage = "usage: %prog [options]";
    
    
    var rules = [
        ["--adjectives", {"dest": "adjectives", "default": null, "help": "List of valid adjectives for passphrase"}],
        ["--nouns", {"dest": "nouns", "default": null, "help": "List of valid nouns for passphrase"}],
        ["--verbs", {"dest": "verbs", "default": null, "help": "List of valid verbs for passphrase"}],
        ["-s", "--separator", {"dest": "separator", "default": " ", "help": "Separator to add between words"}],
        ["-n", "--num", {"dest": "num", "default": 1, "type": "int", "help": "Number of passphrases to generate"}],
        ["--min", {"dest": "min_length", "default": 0, "type": "int", "help": "Minimum length of a valid word to use in passphrase"}],
        ["--max", {"dest": "max_length", "default": 20, "type": "int", "help": "Maximum length of a valid word to use in passphrase"}],
        ["--valid_chars", {"dest": "valid_chars", "default": ".", "help": "Valid chars, using regexp style (e.g. '[a-z]')"}],
        ["-U", "--uppercase", {"dest": "uppercase", "default": false, "action": "store_true", "help": "Force passphrase into uppercase"}],
        ["-L", "--lowercase", {"dest": "lowercase", "default": false, "action": "store_true", "help": "Force passphrase into lowercase"}],
        ["-C", "--capitalise", "--capitalize", {"dest": "capitalise", "default": false, "action": "store_true", "help": "Force passphrase to capitalise each word"}],
        ["--l337", {"dest": "make_leet", "default": false, "action": "store_true", "help": "7#izz R3@l|j !$ 4941Nst 7#3 w#()|e 5P|R!7 0pH t#3 7#|N6."}],
        ["--l337ish", {"dest": "make_mini_leet", "default": false, "action": "store_true", "help": "A l337 version which is easier to remember."}],
        ["-V", "--verbose", {"dest": "verbose", "default": false, "action": "store_true", "help": "Report various metrics for given options"}],
    ]
    parser = new optparse.OptionParser(rules);
    ///[options, args] = parser.parse_args();
    options = parser.options();
    args = process.argv.slice(2);
    
    console.debug('options: ', options);
    console.debug('args: ', args);
    
    validate_options(options, args);
    adjectives = generate_wordlist(...Object.values({"wordfile": options.adjectives, "min_length": options.min_length, "max_length": options.max_length, "valid_chars": options.valid_chars, "make_mini_leet": options.make_mini_leet, "make_leet": options.make_leet}));
    nouns = generate_wordlist(...Object.values({"wordfile": options.nouns, "min_length": options.min_length, "max_length": options.max_length, "valid_chars": options.valid_chars, "make_mini_leet": options.make_mini_leet, "make_leet": options.make_leet}));
    verbs = generate_wordlist(...Object.values({"wordfile": options.verbs, "min_length": options.min_length, "max_length": options.max_length, "valid_chars": options.valid_chars, "make_mini_leet": options.make_mini_leet, "make_leet": options.make_leet}));
    if (options.verbose) {
        verbose_reports({"adjectives": adjectives, "nouns": nouns, "verbs": verbs, "options": options});
    }
    console.log(passphrase(adjectives, nouns, verbs, options.separator, {"num": Number.parseInt(options.num), "uppercase": options.uppercase, "lowercase": options.lowercase, "capitalise": options.capitalise}));
/*}*/


