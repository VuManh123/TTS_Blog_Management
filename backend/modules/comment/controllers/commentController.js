const commentService = require('../services/commentService');
const responseUtils = require('utils/responseUtils');

const commentController = {
  getAll: async (req, res) => {
    try {
      const comments = await commentService.getAllComments();
      return responseUtils.ok(res, comments);
    } catch (error) {
      return responseUtils.error(res, error.message);
    }
  }
};

module.exports = commentController;
