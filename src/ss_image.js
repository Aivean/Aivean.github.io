/**
 *  loads .xp file to use as a background
 * */

const {GlyphImage} = require("glyph-image/glyph-image")

const fs = require('fs');

var data = fs.readFileSync('resources/img/cv1.xp');

function str2ab(str) {
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

module.exports = new GlyphImage(data);
