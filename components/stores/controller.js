const storeService = require("./service");
const bcrypt = require('bcryptjs');

exports.login = async (username, password) => {

    const user = await customerService.login(username);
    let checkPassword;
    if (!user) {
        console.log('no existed username');
        return 1;
    } else {
        checkPassword = await bcrypt.compare(password, user.password);
    }
    if (!checkPassword) {
        console.log('wrong pass');
        return 2;
    }
    console.log('login success');
    return { id: user._id, username: user.username };


}

exports.register = async (username, password, confirmPassword, name, email, phone, address, image) => {

    let user = await customerService.login(username);
    if (user) {
        console.log('existed username');
        return 1;
    }

    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
    let customer = await customerService.register(username, hash, name, email, phone, address, image);
    console.log('register success');
    return { _id: customer._id }

};


exports.getStores = async () => {
    try {
        let stores = await storeService.getAllstore();
        stores = stores.map((item) => {
            item = {
                _id: item._id,
                nameStore: item.nameStore,
                emailStore: item.emailStore,
                passwordStore: item.passwordStore,
                starStore: item.starStore,
                addressStore : item.addressStore,
                phoneStore : item.phoneStore,
                idProductStore: item.idProductStore,
                idServiceStore : item.idServiceStore,
                idpetStore : item.idpetStore,
                avtStore: item.avtStore,
                descriptionStore: item.descriptionStore,
                socketId : item.socketId,
                tokenFCM : item.tokenFCM
            }
            return item;
        })
        return stores;
    } catch (error) {
        console.log(error)
        return false;
    }
}
exports.getStoreById = async (id) => {
    try {
        let store = await storeService.getStoreById(id);
        store = {
            _id: store._id,
            nameStore: store.nameStore,
            emailStore: store.emailStore,
            passwordStore: store.passwordStore,
            starStore: store.starStore,
            addressStore : store.addressStore,
            phoneStore : store.phoneStore,
            otpMailStore : store.otpMailStore,
            avtStore: store.avtStore,
            descriptionStore: store.descriptionStore,
            socketId : store.socketId,
            tokenFCM : store.tokenFCM
        }
        return store;
    }
    catch (error) {
        console.log('error', error);
        return null;
    }
}
exports.delete = async (id) => {
    try {
        await customerService.delete(id);
    } catch (error) {
        return null;
    }
}

exports.getById = async (id) => {
    let customer = await customerService.getById(id);
    customer = {
        ...customer?._doc
    }
    return customer;
}

exports.getAll = async () => {
    let data = await customerService.getAll();
    data = data.map(user => {
        user = {
            ...user?._doc
        }
        return user;
    });
    return data;
}

exports.update = async (id, nameStore, phoneStore, address, emailStore) => {
    return await storeService.update(id, nameStore, phoneStore, address, emailStore);
}

exports.getById = async (id) => {
    let user = await customerService.getById(id);
    user = {
        ...user?._doc
    }
    return user;
}
exports.changePass = async (id, password, newPassword) => {
    const user = await customerService.getById(id);
    //console.log('user: ', user.password);
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
        return 1;
    }
    const hash = await bcrypt.hash(newPassword, await bcrypt.genSalt(10));
    return await customerService.updatePassword(id, hash);
}
