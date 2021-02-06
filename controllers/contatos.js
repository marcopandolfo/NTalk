module.exports = (app) => ({
  index: (req, res) => {
    const { usuario } = req.session;
    const { contatos } = usuario;
    const params = { usuario, contatos };

    console.log("contatos", contatos);
    return res.render("contatos/index", params);
  },
  create: (req, res) => {
    const { contato } = req.body;
    const { usuario } = req.session;
    usuario.contatos.push(contato);

    return res.redirect("/contatos");
  },
  show: (req, res) => {
    const { id } = req.params;
    const contato = req.session.usuario.contatos[id];
    const params = { contato, id };

    return res.render("contatos/show", params);
  },
  edit: (req, res) => {
    const { id } = req.params;
    const { usuario } = req.session;
    const contato = usuario.contatos[id];
    const params = { usuario, contato, id };

    return res.render("contatos/edit", params);
  },
  update: (req, res) => {
    const { contato } = req.body;
    const { usuario } = req.session;
    usuario.contatos[req.params.id] = contato;

    return res.redirect("/contatos");
  },
  destroy: (req, res) => {
    const { usuario } = req.session;
    const { id } = req.params;
    usuario.contatos.splice(id, 1);

    return res.redirect("/contatos");
  },
});
