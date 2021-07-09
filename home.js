module.exports = (app) => {
  const { home } = app.controllers;

  app.get("/", home.index);
  app.post("/entrar", home.login);
  app.post("/sair", home.login);
};
