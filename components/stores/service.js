const storeModel = require('./model');

exports.login = async (username) => {
    const store = await storeModel.findOne({ username: username }, 'id username password');
    return store;
}

exports.register = async (username, password, name, email, phone, address, image) => {
    const store = new storeModel({ username, password, name, email, phone, address, image });
    return await store.save();
}

exports.getAllstore = async () => {
    return await storeModel.find();
}

exports.delete = async (id) => {
    await storeModel.findByIdAndDelete(id);
}
exports.getStoreById = async (id) => {
    const store = await storeModel.findById(id);
    return store;
};

exports.getById = async (id) => {
    const store = await storeModel.findById(id);
    return store;
}

exports.getAll = async () => {
    const stores = storeModel.find().sort({ nameStore: 1});
    return stores;
}

exports.update = async (id, nameStore, phoneStore, addressStore, emailStore) => {
    return await storeModel.findByIdAndUpdate(id, nameStore ,emailStore, addressStore,phoneStore);
}

exports.updatePassword = async (id, newPassword) => {
    return await storeModel.findByIdAndUpdate(id, {password: newPassword});
}
exports.getByEmail = async (email) => {
    const user = await storeModel.findOne({ email })
    return user
}


exports.updatePassword = async (store) => {
    await storeModel.updateOne(
        { _id: store._id },
        {
            $set:
            {
                password: store.password,
            }
        }
    )
}
