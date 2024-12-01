const { Blog, BlogContent, Language } = require('../../../models');  // Đảm bảo sử dụng model đúng

class PostService {
  static async createPost({ title, category, languageId, content, excerpt, userId, image }) {
    try {
      // Kiểm tra nếu languageId không có giá trị
      if (!languageId) {
        throw new Error('Language ID is required');
      }

      // Lấy tên của language từ bảng Language
      const language = await Language.findByPk(languageId);  // Sửa thành Language (chứ không phải Languages)
      if (!language) {
        throw new Error('Language not found');
      }

      // Kiểm tra nếu categoryId không hợp lệ
      if (!category) {
        throw new Error('Category ID is required');
      }

      // Tạo bài viết mới trong bảng Blogs
      const newPost = await Blog.create({
        title,
        excerpt,
        content,
        image,
        status: 'draft', // Nếu không có status từ người dùng, mặc định là 'draft'
        user_id: userId,
        category_id: category,  // Lưu trực tiếp categoryId vào bảng Blogs
        language: language.name,  // Sử dụng tên ngôn ngữ thay vì ID
      });

      // Tạo nội dung bài viết trong bảng BlogContents
      if (content) {
        await BlogContent.create({
          blog_id: newPost.id,
          title,
          main_content: content,
          language_id: languageId, // Lưu language_id vào bảng BlogContent
          root: true, // Có thể đặt root là true cho nội dung chính
        });
      }

      return newPost;
    } catch (error) {
      console.error('Error in creating post:', error);
      throw error;
    }
  }

  static async deletePost(postId) {
    try {
      // Kiểm tra bài viết có tồn tại trong cơ sở dữ liệu không
      const post = await Blog.findByPk(postId);
      if (!post) {
        return null;  // Nếu bài viết không tồn tại, trả về null
      }

      // Xóa nội dung bài viết (BlogContent)
      await BlogContent.destroy({
        where: {
          blog_id: postId,
        },
      });

      // Xóa bài viết từ bảng Blogs
      await post.destroy();

      return post;  // Trả về bài viết đã bị xóa
    } catch (error) {
      console.error('Error in deleting post:', error);
      throw error;
    }
  }
}

module.exports = PostService;
