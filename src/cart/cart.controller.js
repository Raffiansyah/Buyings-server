import {
  getCart,
  createNewCart,
  addNewItemCart,
  deleteAllCart,
  deleteItemsCart,
} from './cart.services.js';

const getAllCart = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const result = await getCart(userId);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const createCarts = async (req, res, next) => {
  const { userId, products } = req.body;
  try {
    const cart = await createNewCart(userId, products);
    res.send({
      message: 'cart created successfully',
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

const addedNewItemCarts = async (req, res, next) => {
  const Data = req.body;
  const { id } = req.params;
  try {
    const cart = await addNewItemCart(id, Data.products);
    res.send({
      message: 'Cart updated successfully',
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

const deletedCarts = async (req, res, next) => {
  const { id } = req.params;
  try {
    const cart = await deleteAllCart(id);
    res.send({
      message: 'Cart Deleted successfully',
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

const deletedItemsCart = async (req, res, next) => {
  const { itemId } = req.params;
  try {
    const item = await deleteItemsCart(itemId);
    res.send({
      message: 'Item cart deleted succesfully',
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAllCart,
  createCarts,
  addedNewItemCarts,
  deletedCarts,
  deletedItemsCart,
};
