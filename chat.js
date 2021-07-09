module.exports = (app) => {
  const { chat } = app.controllers;

  app.get("/chat/:email", chat.index);
};
