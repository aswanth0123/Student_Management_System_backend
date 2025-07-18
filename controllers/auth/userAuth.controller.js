import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/user.js";
export const loginUser = async (req, res) => {
  
  console.log("loginUser");
  try {
    console.log(req.body);

    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate("role");
    if (!user) {
      return res.status(401).json({ message: "Email not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    if(!user.isActive){
      return res.status(401).json({ message: "Accout not Activated" });

    }
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role.name,
        role_id: user.role._id,
        tenant_id: user.tenant_id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role.name,
        role_id: user.role._id,
      },
    });
  } catch (error) {
    console.log(error);
    
    res.status(500).send({ error });
  }
};
export const getCurrentUser = async (req, res) => {
  console.log("get usersss");
  console.log("user", req.user);
  const { id } = req.user;
  const user = await User.findById(id)
    .select("-password")
    .populate("role", "name description")
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  console.log(user);

  res.status(200).json({ user });
};
