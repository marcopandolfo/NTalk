module.exports = (app) => {
  const { contatos } = app.controllers;

  app.get("/contatos", contatos.index);
};
