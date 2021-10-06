import packageJson from '../../package.json';

import {Proskomma} from 'proskomma';

class UWProskomma extends Proskomma {

    constructor() {
        super();
        this.selectors = [
            {
                name: "org",
                type: "string",
                regex: "^[^\\s]+$"
            },
            {
                name: "lang",
                type: "string",
                regex: "^[^\\s]+$"
            },
            {
                name: "abbr",
                type: "string",
                regex: "^[a-z0-9]+$"
            }
        ];
        this.validateSelectors();
        this.filters = {};
        this.customTags = {
            heading: [],
            paragraph: [],
            char: [],
            word: [],
            intro: [],
            introHeading: []
        }
        this.emptyBlocks = [];
    }

    processor() {
        return "ProsKomma JS for Unfolding Word";
    }

    packageVersion() {
        return packageJson.version;
    }

    selectorString(docSetSelectors) {
        return `${docSetSelectors.org}/${docSetSelectors.lang}_${docSetSelectors.abbr}`;
    }

    importDocuments(selectors, contentType, contentStrings, filterOptions, customTags, emptyBlocks, tags) {
        contentStrings = contentStrings.map(cs => cs.replace(/\\s5/g, "\\ts\\*"));
        return super.importDocuments(selectors, contentType, contentStrings, filterOptions, customTags, emptyBlocks, tags);
    }

}

export default UWProskomma;