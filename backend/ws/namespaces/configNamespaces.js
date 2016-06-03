module.exports = function (io) {
    require('./rootNamespace')(io.of('/'));
    require('./chat/chatNamespace')(io.of('/chat'));
};