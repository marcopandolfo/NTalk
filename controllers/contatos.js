module.exports = (app) => ({
  index: (req, res) => {
    const { usuario } = req.session;
    const params = { usuario };
    return res.render("contatos/index", params);
  },
});
