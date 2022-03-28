class Home {
  static renderHome = async (req, res) => {
    res.render('home');
  };

  static renderRegister = async (req, res) => {
    res.render('register');
  };

  static renderLogin = async (req, res) => {
    res.render('login');
  };
}

export default Home;
