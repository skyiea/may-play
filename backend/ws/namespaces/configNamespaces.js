module.exports = function (io) {
    require('./rootNamespace')(io.of('/'));
    require('./chatNamespace')(io.of('/chat'));
};