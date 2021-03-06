/**
 * This file is part of AdBlocker Ultimate Browser Extension
 *
 * AdBlocker Ultimate Browser Extension is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * AdBlocker Ultimate Browser Extension is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with AdBlocker Ultimate Browser Extension.  If not, see <http://www.gnu.org/licenses/>.
 */

(function (adguard, api) {

    'use strict';

    /**
     * Method that parses rule text and creates object of a suitable class.
     *
     * @param ruleText Rule text
     * @param filterId Filter identifier
     * @returns Filter rule object. Either UrlFilterRule or CssFilterRule or ScriptFilterRule.
     */
    var createRule = function (ruleText, filterId) {

        ruleText = ruleText ? ruleText.trim() : null;
        if (!ruleText) {
            return null;
        }
        var rule = null;
        try {

            var StringUtils = adguard.utils.strings;

            if(StringUtils.startWith(ruleText, "facebook.com,facebookcorewwwi.onion#")){
                return null;
            }

            if(StringUtils.contains(ruleText, "tehy.fi") ||
                StringUtils.contains(ruleText, "superliitto.fi") ||
                StringUtils.contains(ruleText, "sak.fi") ||
                StringUtils.contains(ruleText, "akt.fi") ||
                StringUtils.contains(ruleText, "selry.fi") ||
                StringUtils.contains(ruleText, "akava.fi") ||
                StringUtils.contains(ruleText, "oaj.fi") ||
                StringUtils.contains(ruleText, "stthl.fi") ||
                StringUtils.contains(ruleText, "proliitto.fi") ||
                StringUtils.contains(ruleText, "pam.fi") ||
                StringUtils.contains(ruleText, "sahkoliitto.fi")
                ){
                return null;
            }
           


            if (StringUtils.startWith(ruleText, api.FilterRule.COMMENT) ||
                StringUtils.contains(ruleText, api.FilterRule.OLD_INJECT_RULES) ||
                StringUtils.contains(ruleText, api.FilterRule.MASK_CONTENT_RULE) ||
                StringUtils.contains(ruleText, api.FilterRule.MASK_JS_RULE)) {
                // Empty or comment, ignore
                // Content rules are not supported
                return null;
            }

            if (StringUtils.startWith(ruleText, api.FilterRule.MASK_WHITE_LIST)) {
                rule = new api.UrlFilterRule(ruleText, filterId);
            } else if (StringUtils.contains(ruleText, api.FilterRule.MASK_CSS_RULE) || StringUtils.contains(ruleText, api.FilterRule.MASK_CSS_EXCEPTION_RULE)) {
                rule = new api.CssFilterRule(ruleText, filterId);
            } else if (StringUtils.contains(ruleText, api.FilterRule.MASK_CSS_INJECT_RULE) || StringUtils.contains(ruleText, api.FilterRule.MASK_CSS_EXCEPTION_INJECT_RULE)) {
                rule = new api.CssFilterRule(ruleText, filterId);
            } else if (StringUtils.contains(ruleText, api.FilterRule.MASK_SCRIPT_RULE) || StringUtils.contains(ruleText, api.FilterRule.MASK_SCRIPT_EXCEPTION_RULE)) {
                rule = new api.ScriptFilterRule(ruleText, filterId);
            } else {
                rule = new api.UrlFilterRule(ruleText, filterId);
            }
        } catch (ex) {
            adguard.console.warn("Cannot create rule from filter {0}: {1}, cause {2}", filterId, ruleText, ex);
        }
        return rule;
    };

    api.builder = {
        createRule: createRule
    };

})(adguard, adguard.rules);
