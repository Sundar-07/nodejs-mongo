const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies["access-token"];
    if (!token) res.status(401).json({ err: "You are not authenticated" });

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) res.status(403).json({ err: "Token is invalid!" });
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      return res.status(401).json({ err: "You are not authorized" });
    }
  });
};

module.exports = { verifyToken, verifyUser };
