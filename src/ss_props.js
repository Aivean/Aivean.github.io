/**
 * Embeds background image (.xp) dimensions calculated in build-time into client-side JS
 */
const gi = require("./ss_image")

module.exports = (options, loaderContext) => {
    return {
        code: `module.exports = { "width":${gi.width},  height:${gi.height} } `,
        cacheable: true
    };
};