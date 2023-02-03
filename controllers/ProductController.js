import ProductModel from '../models/Product.js';

export const getAll = async (req, res) => {
  try {
    const cat = Number(req.query.category);
    const sortTitle = req.query.title;
    const sortPrice = req.query.price;
    const sortRating = req.query.rating;
    const currentPage = Number(req.query.currentPage);
    const skip = currentPage * 8 - 8;
    const searchVal = req.query.search;

    const products = await ProductModel.find(cat ? { category: cat } : {})
      .find(searchVal ? { $text: { $search: searchVal } } : {})
      .sort(sortTitle ? { title: sortTitle } : null)
      .sort(sortPrice ? { price: sortPrice } : null)
      .sort(sortRating ? { rating: sortRating } : null)
      .skip(currentPage ? skip : null)
      .limit(8);
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'не удалось получить продукты',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const productId = req.params.id;
    ProductModel.findOne(
      {
        _id: productId,
      },

      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'не удалось вернуть продукт',
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: 'Продукт не найден',
          });
        }
        res.json(doc);
      },
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'не удалось найти продукт',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const productId = req.params.id;
    ProductModel.findOneAndDelete(
      {
        _id: productId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: 'не удалось удалить продукт',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Продукт не найден',
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
      message: 'не удалось найти продукт',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new ProductModel({
      title: req.body.title,
      text: req.body.text,
      price: req.body.price,
      category: req.body.category,
      rating: req.body.rating,
      videoUrl: req.body.videoUrl,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });
    const product = await doc.save();
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'не удалось создать продукт',
    });
  }
};

export const update = async (req, res) => {
  try {
    const productId = req.params.id;
    await ProductModel.updateOne(
      {
        _id: productId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        price: req.body.price,
        category: req.body.category,
        rating: req.body.rating,
        videoUrl: req.body.videoUrl,
        user: req.userId,
      },
    );
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'не удалось обновить продукт',
    });
  }
};
