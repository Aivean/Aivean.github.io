/**
 * Client-side js that enables background animation
 * */

/**
 * background image width and height
 * @type {{width: number, height: number}}
 */
const gi = require("./ss_props");

/**
 * index of the DOM nodes that constitute the background image
 * @type {Map<number, {
      "bg": number[],
        "fg": number[],
        "_bg": number[],
        "_fg": number[],
        "newL": number,
        "char": string,
        "node": HTMLPreElement
 *  }>}
 */
const nodes = new Map();

/**
 * list of keys that correspond to "endpoints"
 * @type {number[]}
 */
const keysWithChars = [];

/**
 * Queue of current node brightness
 * @type {Map<number, number>}
 */
let q = new Map();

/**
 * next brightness queue
 * @type {Map<number, number>}
 */
let q0 = new Map();

/**
 * initial brightness value
 * @type {number}
 */
const initialValue = 10;

/**
 * set of keys that were affected by brightness change
 * @type {Set<number>}
 */
const affected = new Set();

/**
 * directions map
 */
const D = {
    'U': (1 << 0),
    'D': (1 << 1),
    'L': (1 << 2),
    'R': (1 << 3),
    'V': (1 << 0) | (1 << 1),
    'H': (1 << 2) | (1 << 3)
};

/** inverted directions */
const invDir = [1, 0, 3, 2];

/**
 * Connectivity for different ASCII symbols
 */
const cc = new Map([
    ["○", D.H | D.V],
    ["─", D.H],
    ["┬", D.H | D.D],
    ["├", D.V | D.R],
    ["┴", D.H | D.U],
    ["│", D.V],
    ["┼", D.H | D.V],
    ["┌", D.R | D.D],
    ["┤", D.V | D.L],
    ["╔", D.D | D.R],
    ["║", D.V],
    ["╫", D.V | D.H],
    ["╚", D.U | D.R],
    ["═", D.H],
    ["╪", D.V | D.H],
    ["┐", D.L | D.D],
    ["└", D.U | D.R],
    ["┘", D.L | D.U],
    ["╗", D.L | D.D],
    ["╝", D.L | D.U]
]);

/**
 * Is given char connected along given direction?
 * @param c  char
 * @param dir  direction
 * @return {boolean} true if connected
 */
function charConnected(c, dir) {
    return cc.has(c) && (cc.get(c) & (1 << dir));
}

// "#abcdef" -> [171, 205, 239]
function hexStr2rgb(hexStr) {
    return hexStr.substr(1).match(/../g).map(x => +`0x${x}`);
}

function rbgStrToHSL(rgb) {
    return rgb2hsl(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255);
}

// input: h in [0,360] and s,v in [0,1] - output: r,g,b in [0,1]
function hsl2rgb(h, s, l) {
    let a = s * Math.min(l, 1 - l);
    let f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return [f(0), f(8), f(4)];
}

// in: r,g,b in [0,1], out: h in [0,360) and s,l in [0,1]
function rgb2hsl(r, g, b) {
    let a = Math.max(r, g, b), n = a - Math.min(r, g, b), f = (1 - Math.abs(a + a - n - 1));
    let h = n && ((a === r) ? (g - b) / n : ((a === g) ? 2 + (b - r) / n : 4 + (r - g) / n));
    return [60 * (h < 0 ? h + 6 : h), f ? n / f : 0, (a + a - n) / 2];
}

function renderHSL(hsl) {
    return `hsl(${hsl[0]}, ${hsl[1] * 100}%, ${hsl[2] * 100}%)`
}


function getX(k) {
    return Math.floor(k / gi.height)
}

function getY(k) {
    return (k % gi.height);
}

function getKey(x, y) {
    return x * gi.height + y;
}

function neighbourK(k, nid) {
    var x = getX(k);
    var y = getY(k);
    return getKey(
        x + Math.floor(nid / 2) * ((nid % 2) * 2 - 1), y + (1 - Math.floor(nid / 2)) * ((nid % 2) * 2 - 1)
    )
}

function hilite(c, v) {
    //hsl
    c = c.slice();
    c[2] = Math.min(c[2] * v, 1);
    return c;
}

function setLight(k, lvl) {
    const n = nodes.get(k);
    if (!n) return;

    const fg = hilite(n._fg, lvl);
    const bg = hilite(n._bg, lvl);

    if (n.bg[2] !== bg[2] || n.fg[2] !== n.fg[2]) {
        n.bg = bg;
        n.fg = fg;
        n.node.style.backgroundColor = renderHSL(bg);
        n.node.style.color = renderHSL(fg);
    }
}

function animate() {
    setInterval(() => {
        affected.clear();
        q0.clear();
        q.forEach((v, k) => {
            if (v > 1) q0.set(k, v - 1);
            affected.add(k);

            for (var dir = 0; dir < 4; dir++) {
                var nk = neighbourK(k, dir);
                if (!nodes.has(nk)) continue;
                affected.add(nk);
                if (v === initialValue && nodes.get(nk).char !== ' ' &&
                    charConnected(nodes.get(k).char, dir) &&
                    charConnected(nodes.get(nk).char, invDir[dir]) &&
                    !q.has(nk)) {
                    q0.set(nk, initialValue)
                }
            }
        });

        var tmp = q0;
        q0 = q;
        q = tmp;

        q.forEach((v, k) => {
            for (var dir = 0; dir < 4; dir++) {
                var nk = neighbourK(k, dir);
                if (!nodes.has(nk)) continue;
                affected.add(nk);
            }
        });

        keysWithChars.forEach((k) => {
            affected.add(k);
            for (var dir = 0; dir < 4; dir++) {
                var nk = neighbourK(k, dir);
                if (!nodes.has(nk)) continue;
                affected.add(nk);
            }
        });

        affected.forEach(k => {
            nodes.get(k).newL = 1
        });

        let lightUp = (k, v) => {
            nodes.get(k).newL =
                Math.max(1 + 1.5 * v * v / initialValue / initialValue, nodes.get(k).newL);

            for (var dir = 0; dir < 4; dir++) {
                var nk = neighbourK(k, dir);
                if (!nodes.has(nk)) continue;
                var node = nodes.get(nk);
                node.newL = Math.max(node.newL, 1 + 1 * v * v / initialValue / initialValue)
            }
        }

        q.forEach((v, k) => {
            lightUp(k, v);
        });

        let time = new Date().getTime();

        keysWithChars.forEach((k, i) => {
            let v = (Math.sin(
                ((i + time / 200) % keysWithChars.length) / keysWithChars.length * Math.PI * 4
            ) + 1) / 2;

            lightUp(k, Math.floor(v * initialValue * 3 / 4));

            if (!q.size && v > 0.9 && Math.random() * 200 < 3) {
                q.set(k, Math.floor(initialValue));
            }
        });

        affected.forEach(k => setLight(k, nodes.get(k).newL));

    }, 50);
}

document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll("#center pre").forEach(/** @type HTMLPreElement */tag => {

        const char = tag.innerText;
        const k = parseInt(tag.id.substr(1));

        tag.addEventListener("click", () => {
            q.set(k, initialValue);
            return false;
        });

        const bg = rbgStrToHSL(hexStr2rgb(tag.dataset.bg));
        const fg = rbgStrToHSL(hexStr2rgb(tag.dataset.fg));

        n = {
            "bg": bg,
            "fg": fg,
            "_bg": bg,
            "_fg": fg,
            "newL": 1,
            "char": char,
            "node": tag
        };

        nodes.set(k, n);

        if (char === '○') {
            keysWithChars.push(k);
        }
    });

    animate();

}, false);