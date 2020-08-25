/**
 *  renders .xp image into html
 * */

const gi = require("./ss_image")

function getX(k) {
    return Math.floor(k / gi.height)
}

function getY(k) {
    return (k % gi.height);
}

const res = [];

gi.layer[0].forEach((v, k) => {
    const x = getX(k);
    const y = getY(k);

    const tag = `<pre style="position: absolute;\
        left:${Math.floor((x - gi.width / 2))}em; top:${Math.floor((y - gi.height / 2))}em; \
        color: ${v.fg}; background-color:${v.bg};"\
        data-fg="${v.fg}" data-bg="${v.bg}" \
        id="n${k}">${v.char}</pre>`;

    res.push(tag);
});

module.exports = res.join('');