import './style.less';
import template from './template.html';
import MdT from 'md-transform';

import resume from '../../../documents/resume.md';

var tokens = MdT.getTokens(resume);
var resumeHtml = MdT.splitByHeading(tokens, 1).reduce((html, section) => {
    var sectionHtml = MdT.render(MdT.replaceByHeading(section, 2));
    MdT.splitByHeading(section, 2).forEach(
        item => sectionHtml = sectionHtml.replace('<hr>', `<blockquote>${ MdT.render(item) }</blockquote>`)
    );
    return html + sectionHtml;
}, '');

export default {
    template,
    route: {
        data: () => ({
            resumeHtml
        })
    },
    data: () => ({
        resumeHtml: ''
    }),
    ready() {
        this.$dispatch('theme:set', 'cyan');
    },
    methods: {
        scroll(e) {
            this.$els.contents.scrollLeft += -e.wheelDelta / 2;
        }
    }
};