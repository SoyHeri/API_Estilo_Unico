
const Cart = require('../models/cart');
const Product = require('../models/product');

// GET /cart
exports.getCart = async (req, res) => {
  const { userId } = req.query;
  try {
    let cart;
    if (userId) {
      cart = await Cart.findOne({ user: userId }).populate('items.product');
    } else {
      cart = new Cart();
      await cart.save();
    }
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const { userId } = req.query;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId });
    }
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /cart/:id
exports.removeFromCart = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.query;
  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
      return;
    }
    cart.items = cart.items.filter((item) => item.product.toString() !== id);
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
