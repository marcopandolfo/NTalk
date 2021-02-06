module.exports = (app) => ({
  index: (req, res) => {
    res.render("home/index");
  },
  login: (req, res) => {
    const { email, nome } = req.body;

    if (email && nome) {
      const { usuario } = req.body;
      usuario.contatos = [];
      req.session.usuario = usuario;
      return res.redirect("/contatos");
    }

    return res.redirect("/");
  },
  logout: (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
});
