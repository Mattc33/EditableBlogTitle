// @flow
const StringUtils = {
    parseIntoSlug: (str: string): string => {
        const slug = str.replace(/\W+/g, "-").toLocaleLowerCase();
        let newSlug = '';
        if ( slug[slug.length - 1] === '-') {
            newSlug = slug.slice(0, -1)
        } else {
            newSlug = slug
        }
        return newSlug
    }
}

export default StringUtils;