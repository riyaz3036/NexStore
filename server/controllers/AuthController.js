const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const User = require('../models/User');
const Favorites = require('../models/Favoraites'); 
const Cart = require('../models/Cart'); 


const Register = async (req, res) => {
    try {
      // Check if email already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email already exists' });
      }
  
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
  
      // If admin, check secret key
      if (req.body.role === 'admin') {
        if (req.body.ADMIN_KEY !== 'RIYAZ1010') {
          return res.status(403).json({ success: false, message: 'Invalid admin key' });
        }
      }
  
      // Create new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        phone: req.body.phone,
        role: req.body.role,
      });
  
      await newUser.save();
  
      if (req.body.role !== 'admin') {
        const newFavorites = new Favorites({ user_id: newUser._id });
        const newCart = new Cart({ user_id: newUser._id, variants: [] }); 
        
        await newFavorites.save();
        await newCart.save();
      }
  
      res.status(200).json({ success: true, message: 'Successfully registered' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
  


//Logging the user
const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });

      // Check if user exists
      if (!user) {
          return res.status(404).json({ success: false, message: 'User Not Found' });
      }

      // Check password
      const checkCorrectPassword = await bcrypt.compare(password, user.password);

      if (!checkCorrectPassword) {
          return res.status(401).json({ success: false, message: 'Incorrect email or Password' });
      }

      const { password: _, ...rest } = user._doc;
      const secretKey = process.env.JWT_SECRET_KEY || 'default_secret_key';
      // Create a JWT token
      const token = jwt.sign({ id: user._id.toString(), role: user.role }, secretKey, { expiresIn: '15d' });

      // Set the token in the browser cookies and send the response to the client
      res.cookie('accessToken', token, {
          httpOnly: true,
          expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), 
      }).status(200).json({
          success: true,
          message: 'Successfully logged in',
          data: { ...rest, role: user.role }, 
          token
      });

  } catch (err) {
      console.error(err); // For debugging
      res.status(500).json({ success: false, message: 'Failed to login' });
  }
};


module.exports = {Login, Register};