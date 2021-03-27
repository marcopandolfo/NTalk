module.exports = (app) => ({
  index: (req, res) => {
    const resultado = { email: req.params.email, usuario: req.session.usuario };

    res.render("chat/index", resultado);
  },
});
