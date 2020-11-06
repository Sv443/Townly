const dbg = require("./dbg");

const trFile = require("../data/translations.json");



/** @typedef {"en"|"de"} LangCode */
/** @typedef {"info"|"mainmenu"|"settingsmenu"|"mappresetmenu"|"mapsizemenu"|"needs"|"cells"|"misc"} TrSection */
/**
 * @typedef {Object} LangObj
 * @prop {LangCode} code
 * @prop {String} name
 */

/**
 * @typedef {Object} TranslationsObj
 * @prop {Object} en
 * @prop {Object} de
 */


/** @type {LangCode} */
var language = trFile.meta.defaultLanguage;
/** @type {LangObj[]} */
var availableLangs = [];
/** @type {TranslationsObj} */
var translations = {};


function init()
{
    return new Promise((pRes) => {
        Object.keys(trFile.meta.languages).forEach(langCode => {
            availableLangs.push({
                code: langCode,
                name: trFile.meta.languages[langCode]
            });
        });

        // TODO: verify
        Object.keys(trFile.translations).forEach(section => {
            Object.keys(trFile.translations[section]).forEach(trKey => {
                Object.keys(trFile.translations[section][trKey]).forEach(trLangCode => {
                    let translation = trFile.translations[section][trKey][trLangCode];
                    if(!translations[trLangCode])
                        translations[trLangCode] = {};
                    
                    if(!translations[trLangCode][section])
                        translations[trLangCode][section] = {};
                    
                    translations[trLangCode][section][trKey] = translation;
                });
            });
        });

        dbg("Translate", `Initialized translations from these languages: ${Object.keys(translations).join(", ")}`);

        return pRes();
    });
}

/**
 * Sets Townly's language
 * @param {LangCode} lang 
 */
function setLanguage(lang)
{
    language = lang;
}

/**
 * Returns the currently set language
 * @returns {LangCode}
 */
function getLanguage()
{
    return language;
}

/**
 * Translates a string to the language set with `setLanguage()`
 * @param {TrSection} section 
 * @param {String} key 
 * @param {String|Number} args
 * @returns {String|Number|Boolean|null}
 */
function tr(section, key, ...args)
{
    let translation = "";
    if(translations[language] && translations[language][section] && translations[language][section][key])
        translation = translations[language][section][key];
    else
        return null;

    if(Array.isArray(args))
    {
        args.forEach((arg, i) => {
            translation = translation.replace(new RegExp(`%${(i + 1)}`, "m"), arg);
        });
    }

    return translation;
}


module.exports = tr;

module.exports.init = init;
module.exports.setLanguage = setLanguage;
module.exports.getLanguage = getLanguage;
