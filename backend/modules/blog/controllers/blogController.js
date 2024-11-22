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

  // Lấy tất cả bài viết
  getAllRequire: async (req, res) => {
    try {
      const blogs = await blogService.getAllBlogsRequired();
      // Định dạng lại dữ liệu để trả về
      const formattedBlogs = blogs.map(blog => ({
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        image: blog.image,
        content: blog.content,
        created_at: blog.created_at,
        updated_at: blog.updated_at,
        categoryId: blog.category_id,
        author: {
          id: blog.author.id,
          name: blog.author.name,  // Hiển thị username của tác giả
          date: blog.author.created_at, // Ngày tạo tài khoản của tác giả
          profileImage: blog.author.profileImage, // Hình ảnh đại diện của tác giả
        },
      }));

      return responseUtils.ok(res, formattedBlogs);
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