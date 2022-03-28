import models from '../database/models';
import createUserService from '../services/UserServices';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { roleEntryValidation } from '../helpers/roleValidation';
import { roles } from '../helpers/roles';
import { verificationEmail } from '../template/VerifyEmail';
import { sendEmail } from '../services/SendEmail';

const { User, Role } = models;

class UserController {
  static renderRegister = async (req, res) => {
    res.render('register');
  };

  static renderLogin = async (req, res) => {
    res.render('login');
  };

  static createUser = async (req, res) => {
    //check if a user is in the database
    const emailExists = await User.findOne({
      where: { username: req.body.UserName },
    });
    if (emailExists)
      return res
        .status(400)
        .json({ message: 'Email already Exists as the Username' });

    //Hash the Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.Password, salt);

    try {
      const user = await createUserService({
        // firstName: req.body.FirstName,
        phoneNumber: req.body.PhoneNumber,
        name: req.body.Name,
        username: req.body.UserName,
        password: hashedPassword,
      });

      //create and Assign a token
      const token = jwt.sign(
        {
          user: {
            id: user.id,
            username: user.userName,
            email: user.email,
            role: user.roleId,
            isVerified: user.isVerified,
          },
        },
        process.env.TOKEN_SECRET
      );

      console.log(token);

      const email = {
        to: user.username,
        subject: 'Account verification Email',
        from: process.env.SENDGRID_EMAIL,
        text: `Hello  ${user.name}`,
        html: await verificationEmail(token),
      };
      await sendEmail(email);
      // res.header('auth-token', token);
      res.status(200).json({
        message: 'User created successfully plz confirm your email',
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  static assignRoles = async (req, res) => {
    const userRole = req.body.RoleId;
    const userExist = await User.findOne({
      where: { email: req.body.Email },
      include: [{ model: Role, attributes: ['id', 'name'] }],
    });

    if (!userExist) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    try {
      await User.update(
        { roleId: userRole },
        {
          where: { email: req.body.Email },
        }
      ).then(
        res.status(200).json({ message: 'User Role updated successfully' })
      );
    } catch (error) {
      res.status(500).json({ message: 'Error updating role' });
    }
  };

  static verifyNewUser = async (req, res) => {
    try {
      const { token } = req.params;
      const userInfo = jwt.verify(token, process.env.TOKEN_SECRET);
      const userId = userInfo.user.id;
      const isVerified = true;
      models.User.update({ isVerified: isVerified }, { where: { id: userId } });
      return res.render('confirm');
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error.message });
    }
  };

  static getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).send({ message: 'All Users', users });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  static login = async (req, res) => {
    try {
      const { UserName, Password } = req.body;
      const UserNameExists = await User.findOne({
        where: { username: UserName },
      });
      if (!UserNameExists)
        return res
          .status(400)
          .json({ message: 'Email or password is Incorrect' });
      const validPass = await bcrypt.compare(Password, UserNameExists.password);
      const AccountIsVerfied = UserNameExists.isVerified;

      // console.log(AccountIsVerfied);

      if (!UserNameExists || !validPass)
        return res
          .status(400)
          .json({ message: 'Email or password is Incorrect' });

      if (AccountIsVerfied == false)
        return res.status(401).json({ message: 'Account is not Verified' });

      const accessToken = jwt.sign(
        {
          user: {
            id: UserNameExists.id,
            username: UserNameExists.userName,
            email: UserNameExists.email,
            role: UserNameExists.roleId,
            isVerified: UserNameExists.isVerified,
          },
        },
        process.env.TOKEN_SECRET
      );

      res
        .status(200)
        .json({ message: 'Logged In Successfully', token: accessToken });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}
export default UserController;
