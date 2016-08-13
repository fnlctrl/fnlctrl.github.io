import skills from './skills.js';
import contacts from './contacts.js';

export default {
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        contacts,
        skills,
        styles: `
            <style>${
            Object.keys(skills).reduce((prev, curr) => {
                var color = skills[curr].style.color;
                return prev + `
                    ._${color}:hover path{
                        fill: #${color};
                    }
                    ._${color} .background {
                        background: #${color};
                    }
                `
            }, '')
            }</style>
        `
    })
};