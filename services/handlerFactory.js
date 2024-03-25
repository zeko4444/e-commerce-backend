const asynchandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

exports.delete = (model) =>
  asynchandler(async (req, res, next) => {
    const { id } = req.params;

    const document = await model.findByIdAndDelete(id);
    if (!document) {
      return next(new ApiError(`no document for this id ${id}`, 404));
    }
    res.status(204).send();
  });

exports.update = (model) =>
  asynchandler(async (req, res, next) => {
    const document = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!document) {
      return next(new ApiError(`no document for this id ${id}`, 404));
    }
    res.status(201).json({ data: document });
  });

exports.create = (model) =>
  asynchandler(async (req, res) => {
    const document = await model.create(req.body);
    res.status(201).json({ data: document });
  });

exports.getOne = (model) =>
  asynchandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await model.findById(id);
    if (!document) {
      return next(new ApiError(`no document for this id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.getAll = (model) =>
  asynchandler(async (req, res) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    console.log(filter);
    const docsNumber = await model.countDocuments();
    const apiFeatures = new ApiFeatures(model.find(filter), req.query)
      .paginate(docsNumber)
      .filter()
      .search()
      .limit()
      .sort();

    const { mongooseQuery, paginationResults } = apiFeatures;
    const documents = await mongooseQuery;
    res
      .status(200)
      .json({ results: documents.length, paginationResults, data: documents });
  });
