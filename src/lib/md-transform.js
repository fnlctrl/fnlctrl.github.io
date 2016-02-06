import marked from 'marked';

const DUMMY_LINKS = {};
/* Setup custom renderer */
const renderer = new marked.Renderer();
renderer.link = (href, title, text) => {
    return `<a href="${ href }" target="_blank">${ text }</a>`;
};
renderer.heading = (text, level, raw) => `<h${ level } id="${ raw.toLowerCase() }">${ text }</h${ level }>`;

export default {
    getTokens: markdown => marked.lexer(markdown),
    splitByHeading,
    replaceByHeading,
    render
}

function replaceByHeading(tokens, depth) {
    var markDelete = false;
    return tokens.map(token => {
        if (token.type == 'heading' && token.depth < depth) {
            markDelete = false;
            return token;
        } else if (token.type == 'heading' && token.depth == depth) {
            markDelete = true;
            return {type: 'hr'};
        } else {
            if (!markDelete) return token;
        }
    }).filter(i => i);
}

function splitByHeading(tokens, depth) {
    if (!depth) return;
    var result = [], length = tokens.length, currentGroup;
    tokens.forEach(token => {
        if (token.type == 'heading' && token.depth < depth) {
            /* Add queue to result and flush queue */
            if (currentGroup) {
                result.push(currentGroup);
                currentGroup = null;
            }
        } else if (token.type == 'heading' && token.depth == depth) {
            if (currentGroup && currentGroup.length > 0) {
                /* Add queue to result */
                result.push(currentGroup);
            }
            /* Re-init queue */
            currentGroup = [token];
            //currentGroup.links = DUMMY_LINKS;
        } else {
            /* Add token to queue */
            currentGroup && currentGroup.push(token);
        }
    });
    /* Add last group to results */
    currentGroup && result.push(currentGroup);
    return result;
}

function render(tokens) {
    if (!tokens.links) tokens.links = DUMMY_LINKS;
    return marked.parser(tokens, {renderer});
}
