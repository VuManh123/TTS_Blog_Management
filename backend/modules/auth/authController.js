const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("models");  // Import model User

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    "secretKey",  // Secret key của bạn
    { expiresIn: "12h" }  // Token sẽ hết hạn sau 24 giờ
  );
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Tìm user trong database
    const user = await User.findOne({ where: { username } });

    // Kiểm tra nếu user không tồn tại hoặc mật khẩu không đúng
    if (!user || password != user.password) {
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    // Kiểm tra nếu user đã tồn tại
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username đã tồn tại" });
    }

    // Tạo user mới trong database
    const newUser = await User.create({
      username,
      password: hashedPassword,
      // Thêm các trường khác nếu cần
    });

    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
