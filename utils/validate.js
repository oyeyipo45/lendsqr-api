module.exports = (req, res, next) => {
  const { username, email, password, first_name, last_name } = req.body;

  const validEmail = (userEmail) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  };

  if (req.path === '/register') {
    // Validate values
    if (![username, email, password, first_name, last_name].every(Boolean)) {
      return res.status(400).json({ status: 400, success: false, message: 'One or More Credential are Missing' });
    } else if (!validEmail(email)) {
      return res.status(400).json({ status: 400, success: false, message: 'Invalid Email' });
    } else if (password.length < 6) {
      return res.status(400).json({ status: 400, success: false, message: 'Password is Less Than 6 Characters' });
    }
  } else if (req.path === '/login') {
    if (![email, password].every(Boolean)) {
      return res.status(401).json({ status: 401, success: false, message: 'Missing Credentials' });
    } else if (!validEmail(email)) {
      return res.status(401).json({ status: 401, success: false, message: 'Invalid Email' });
    }
  }

  next();
};
