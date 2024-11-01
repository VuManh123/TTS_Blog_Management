const db = require("models");
const Blog = db.Blog;

const blogService = {
  createBlog: async (blogData) => {
    return await Blog.create(blogData);
  },

  getAllBlogs: async () => {
    return await Blog.findAll({
      include: { model: db.User, as: 'author', attributes: ['username'] },
    });
  },

  getBlogById: async (id) => {
    return await Blog.findByPk(id, {
      include: { model: db.User, as: 'author', attributes: ['username'] },
    });
  },

  updateBlog: async (id, blogData) => {
    const blog = await Blog.findByPk(id);
    if (!blog) {
      throw new Error('Blog not found');
    }
    return await blog.update(blogData);
  },

  deleteBlog: async (id) => {
    const blog = await Blog.findByPk(id);
    if (!blog) {
      throw new Error('Blog not found');
    }
    await blog.destroy();
  },

  getBlogByUserId: async (id) => {
    
  }
};

module.exports = blogService;
