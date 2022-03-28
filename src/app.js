import express from 'express';
import dotenv from 'dotenv';
import 'colors';
import dbase from './database/config/database';
import usersRoute from './routes/userRoute';
import init from './config/init';
import homeController from './controllers/homeController';
import docs from './swagger/index';

dotenv.config();

dbase.authenticate().then(() => {
  init()
    .then(console.log('database connected......'.green.bgBlue))
    .catch((err) => console.log(err));
});

const app = express();
//setting view engine to ejs
// app.set('views', path.join(__dirname, 'template'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use('/api', usersRoute);
app.use('/api/docs', docs);
app.get('/', homeController.renderHome);
app.get('/api/register', homeController.renderRegister);
app.get('/api/login', homeController.renderLogin);
export default app;
