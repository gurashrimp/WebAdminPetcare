const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const { enumStatusOrder } = require('../../utils/constants');

const orderSchema = new Schema({
    id: {
        type: ObjectId
    },
    idUserAccount: {
        type: Schema.Types.ObjectId,
        ref: 'accounts',
    },
    idAccountStore: {
        type: Schema.Types.ObjectId,
        ref: 'accountstores',
    },
    ProductId: {
        type: Schema.Types.ObjectId,
        ref: 'productstores',
    },
    PetId: {
        type: Schema.Types.ObjectId,
        ref: 'petstores',
    },
    ServiceId: {
        type: Schema.Types.ObjectId,
        ref: 'servicestores',
    }
});

orderSchema.set('timestamps', true);
module.exports = mongoose.model('cartoders', orderSchema);