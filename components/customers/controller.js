const customerService = require("./service");
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


exports.getCustomers = async () => {
    try {
        let customers = await customerService.getAllCustomer();
        customers = customers.map((item) => {
            item = {
                _id: item._id,
                password: item.password,
                nameAccount: item.nameAccount,
                emailAccount: item.emailAccount,
                numberphone: item.numberphone,
                address: item.address,
                tokenFCM: item.tokenFCM
            }
            return item;
        })
        return customers;
    } catch (error) {
        console.log(error)
        return false;
    }
}
exports.getCustomerById = async (id) => {
    try {
        let customer = await customerService.getCustomerById(id);
        customer = {
            _id: customer._id,
            passWordAccount: customer.passWordAccount,
            nameAccount: customer.nameAccount,
            emailAccount: customer.emailAccount,
            numberphone: customer.numberphone,
            address: customer.address,
            tokenFCM: customer.tokenFCM
        }
        return customer;
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
    let user = await customerService.getById(id);
    user = {
        ...user?._doc
    }
    return user;
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

exports.update = async (id, nameAccount, phone, address, email) => {
    return await customerService.update(id, nameAccount, phone, address, email);
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
