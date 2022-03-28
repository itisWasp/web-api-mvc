import jwt from 'jsonwebtoken';

class privateRoute {
  static authUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');

    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verified.user;

      // if(req.user.role == 'admin'){
      //     res.status(401).send('Access Denied You are an Admin');
      // }

      next();
    } catch (error) {
      res.status(400).json({ msg: 'Invalid Token' });
    }
  };

  static authAdmin = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token)
      return res.status(401).json({
        msg: 'Access Denied You Do not have permission to access this Page',
      });

    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verified.user;

      if (req.user.role == '1') {
        res.status(401).json({ msg: 'Access Denied You Are not Authorized' });
      }

      next();
    } catch (error) {
      res.status(400).json({ msg: 'Invalid Token' });
    }
  };
}

export default privateRoute;
