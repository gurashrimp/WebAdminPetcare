const notiService = require('./service');
exports.send = async (notification) => {
    try {
        await notiService.insert(notification);
    } catch (error) {
        return null;
    }
}