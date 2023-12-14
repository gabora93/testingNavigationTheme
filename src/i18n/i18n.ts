import * as Localization from "expo-localization"
import {I18n, TranslateOptions} from "i18n-js"
import en from "./en.json"
import ja from "./ja.json"
import es from "./es.json"
import de from "./de.json"
import fr from "./fr.json"
import it from "./it.json"
import nl from "./nl.json"
import pl from "./pl.json"
export const i18n = new I18n();
i18n.enableFallback = true;
i18n.translations = { en, ja, es, de, it,fr,nl,pl }
 
i18n.locale =  "en-US"
//i18n.locale =  "es-MX"
// i18n.locale =  "nl-NL"
//i18n.locale =  "pl-PL"
//i18n.locale =  "de-DE"
//i18n.locale =  "fr-FR"
//i18n.locale =  "en-US"
//i18n.locale =  "it-IT"
//
//
//
console.log(i18n.locale);
/**
 * Builds up valid keypaths for translations.
 * Update to your default locale of choice if not English.
 */
type DefaultLocale = typeof es
export type TxKeyPath = RecursiveKeyOf<DefaultLocale>

type RecursiveKeyOf<TObj extends Record<string, any>> = {
  [TKey in keyof TObj & string]: TObj[TKey] extends Record<string, any>
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`
}[keyof TObj & string]


/**
 * Translates text.
 *
 * @param key The i18n key.
 */
export function translate(key: TxKeyPath, options?: TranslateOptions) {

  return key ? i18n.t(key, options) : null
}
