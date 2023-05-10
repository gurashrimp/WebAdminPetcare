const notifyModel = require('./model');



exports.getAllNotify = async () => {
    return await notifyModel.find().sort({ createdAt: -1 });
}

exports.delete = async (id) => {
    await notifyModel.findByIdAndDelete(id);
}
exports.getNotifyById = async (id) => {
    const notify = await notifyModel.findById(id);
    return notify;
};

exports.getById = async (id) => {
    const notify = await notifyModel.findById(id);
    return notify;
}

exports.getAll = async () => {
    const notifies = notifyModel.find().sort({ sender: 1});
    return notifies;
}
exports.insert = async (notify) => {
    const n = new notifyModel(notify);
    await n.save();
}




