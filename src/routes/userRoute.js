import express from 'express';
import UserController from '../controllers/userController';
import UserValidation from '../validations/UserValidation';
import privateRoute from '../middlewares/verifyToken';
import HomeController from '../controllers/homeController';
const router = express.Router();
const app = express();

router.post('/register', UserValidation.verifyUser, UserController.createUser);
router.post('/role', UserValidation.verifyRoles, UserController.assignRoles);
router.get('/verifyEmail/:token', async (req, res) => {
  await new UserController.verifyNewUser(req, res);
});
router.post('/login', UserValidation.verifyLogin, UserController.login);
router.get('/users', privateRoute.authAdmin, UserController.getAllUsers);

export default router;
