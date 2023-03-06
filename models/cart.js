
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
