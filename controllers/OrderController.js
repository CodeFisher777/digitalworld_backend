import OrderModel from '../models/Order.js';

export const getAll = async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'не удалось получить заказы',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const orderId = req.params.id;
    OrderModel.findOneAndDelete(
      {
        _id: orderId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: 'не удалось удалить заказ',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Заказ не найден',
          });
        }
        res.json({
          succes: true,
        });
      },
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'не удалось найти заказ',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new OrderModel({
      order: req.body.order,
      numberOrder: req.body.numberOrder,
    });
    const order = await doc.save();
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'не удалось создать заказ',
    });
  }
};

export const getLastOne = async (req, res) => {
  try {
    const orders = await OrderModel.find().sort({ numberOrder: -1 }).limit(1);
    res.json(orders);
  } catch (err) {
    console.log(err);
    if (orders === undefined) {
      res.status(501).json({
        message: 'заказы отсутствуют',
      });
    } else {
      res.status(500).json({
        message: 'не удалось получить последний номер заказа',
      });
    }
  }
};
