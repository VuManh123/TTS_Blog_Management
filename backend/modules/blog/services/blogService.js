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

   // Lấy tất cả các bài viết và thông tin tác giả
   getAllBlogsRequired: async () => {
    return await Blog.findAll({
      include: {
        model: db.User,
        as: 'author',
        attributes: ['id', 'name', 'profileImage', 'created_at'], // Lấy các trường cần thiết của tác giả
      },
      attributes: [
        'id',
        'title',
        'slug',
        'excerpt',
        'image',
        'content',
        'created_at',
        'updated_at',
        'category_id'
      ],
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
