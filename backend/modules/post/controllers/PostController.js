const postService = require('../services/postService');

class PostController {
  // Tạo bài viết mới
  static async createPost(req, res) {
    try {
      const { title, category, languageId, content, excerpt, userId, image } = req.body;
      if (!title || !category || !languageId || !content || !excerpt || userId === 0) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required and must be valid!',
        });
      }
      
      const newPost = await postService.createPost({
        title,
        category,
        languageId,
        content,
        excerpt,
        userId,
        image,
      });
      
      return res.status(201).json({
        success: true,
        message: 'Post created successfully!',
        data: newPost,
      });
    } catch (error) {
      console.error('Error creating post:', error);
      return res.status(500).json({
        success: false,
        message: 'Error creating post',
        error: error.message,
      });
    }
  }

  static async deletePost(req, res) {
    try {
      const { id } = req.params;  // Lấy ID bài viết từ URL params

      // Kiểm tra nếu ID không hợp lệ
      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Post ID is required',
        });
      }

      // Gọi service để xóa bài viết
      const result = await postService.deletePost(id);

      // Nếu không tìm thấy bài viết
      if (!result) {
        return res.status(404).json({
          success: false,
          message: 'Post not found',
        });
      }

      // Trả về thông báo thành công
      return res.status(200).json({
        success: true,
        message: 'Post deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      return res.status(500).json({
        success: false,
        message: 'Error deleting post',
        error: error.message,
      });
    }
  }
}


module.exports = PostController;
