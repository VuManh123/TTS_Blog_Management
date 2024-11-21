const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("models");  // Import model User

const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, "secretKey", { expiresIn: "1h" });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Tìm user trong database
    const user = await User.findOne({ where: { username } });

    // Kiểm tra nếu user không tồn tại hoặc mật khẩu không đúng
    if (!user || !bcrypt.compareSync(password, user.password)) {
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
  const { username, password, email, first_name, last_name, avatar_url } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    // Kiểm tra nếu user đã tồn tại
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username đã tồn tại" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email là bắt buộc" });
    }

    // Kiểm tra nếu thiếu firstname, lastname
    if (!first_name || !last_name) {
      return res.status(400).json({ message: "Firstname và Lastname là bắt buộc" });
    }

    // Tạo user mới trong database
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      first_name,
      last_name,
      avatar_url, // Thêm avatar vào cơ sở dữ liệu
    });

    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};