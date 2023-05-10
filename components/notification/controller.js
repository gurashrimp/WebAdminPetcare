const notifyService = require("./service");
const date = require('../../utils/date');
exports.getNotifies = async () => {
    try {
        let notifies = await notifyService.getAllNotify();
        notifies = notifies.map((item) => {
            item = {
                _id: item._id,
                title: item.title,
                content: item.content,
                sender: item.sender,
                type: item.type,
                createdAt: date.format(item.createdAt)
            }
            return item;
        })
        return notifies;
    } catch (error) {
        console.log(error)
        return false;
    }
}
exports.getNotifyById = async (id) => {
    try {
        let notify = await notifyService.getNotifyById(id);
        notify = {
            _id: notify._id,
            title: notify.title,
            content: notify.content,
            sender: notify.sender
        }
        return notify;
    }
    catch (error) {
        console.log('error', error);
        return null;
    }
}


exports.getById = async (id) => {
    let notify = await notifyService.getById(id);
    notify = {
        ...notify?._doc
    }
    return notify;
}

exports.getAll = async () => {
    let data = await notifyService.getAll();
    data = data.map(notify => {
        notify = {
            ...notify?._doc
        }
        return notify;
    });
    return data;
}
exports.getById = async (id) => {
    let notify = await notifyService.getById(id);
    notify = {
        ...notify?._doc
    }
    return notify;
}
exports.insert = async (notify) => {
    try {
        await notifyService.insert(notify);
    } catch (error) {
        return null;
    }
}
