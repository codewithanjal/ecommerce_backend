const User = require('../models/User');
const jwt = require('jsonwebtoken');

/* ================= ADMIN LOGIN ================= */
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Check if user is admin
    if (!user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Not an admin." });
    }

    // 3. Password check (plain)
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 4. JWT token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: "Admin login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};