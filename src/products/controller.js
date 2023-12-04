const Product = require("./model");

module.exports = {
  addNew: async function (req, res, next) {
    try {
      const newProduct = new Product({ ...req.body, media: req.body.media });
      const docs = await newProduct.save();
      if (!docs) throw new Error();
      return res.status(201).json(docs);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  getAll: async function (req, res, next) {
    try {
      const docs = await Product.find({});
      if (!docs) throw new Error();
      return res.status(200).json(docs);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  getOne: async function (req, res, next) {
    try {
      const doc = await Product.findById(req.params.id);
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  updateOne: async function (req, res, next) {
    try {
      const doc = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  deleteOne: async function (req, res, next) {
    try {
      const doc = await Product.findByIdAndDelete(req.params.id);
      if (!doc) throw new Error();
      return res.status(200).json(doc);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};
