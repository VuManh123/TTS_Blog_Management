const blogService = require("../services/blogService"); // Nhập blogService
const responseUtils = require("utils/responseUtils");

const blogController = {
  create: async (req, res) => {
    try {
      const blogData = {
        ...req.body,
        user_id: req.user.id // Lấy ID của Blog Owner từ JWT
      };
      const blog = await blogService.createBlog(blogData);
      return responseUtils.ok(res, blog);
    } catch (error) {
      return responseUtils.error(res, error.message);
    }
  },

  getAll: async (req, res) => {
    try {
      const blogs = await blogService.getAllBlogs();
      return responseUtils.ok(res, blogs);
    } catch (error) {
      return responseUtils.error(res, error.message);
    }
  },

  getById: async (req, res) => {
    try {
      const blog = await blogService.getBlogById(req.params.id);
      if (!blog) {
        return responseUtils.notFound(res);
      }
      return responseUtils.ok(res, blog);
    } catch (error) {
      return responseUtils.error(res, error.message);
    }
  },

  update: async (req, res) => {
    try {
      const blog = await blogService.updateBlog(req.params.id, req.body);
      return responseUtils.ok(res, blog);
    } catch (error) {
      if (error.message === 'Blog not found') {
        return responseUtils.notFound(res);
      }
      return responseUtils.error(res, error.message);
    }
  },

  delete: async (req, res) => {
    try {
      await blogService.deleteBlog(req.params.id);
      return responseUtils.noContent(res);
    } catch (error) {
      if (error.message === 'Blog not found') {
        return responseUtils.notFound(res);
      }
      return responseUtils.error(res, error.message);
    }
  },

  
};

module.exports = blogController;
