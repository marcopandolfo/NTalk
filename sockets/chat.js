const crypto = require("crypto");
const md5 = crypto.createHash("md5");

module.exports = (io) => {
  const { sockets } = io;

  sockets.on("connection", (client) => {
    const { session } = client.handshake;
    const { usuario } = session;

    client.on("send-server", (msg) => {
      msg = "<b>" + usuario.nome + ":</b> " + msg + "<br>";

      client.get("sala", (erro, sala) => {
        const data = { email: usuario.email, sala: sala };

        client.broadcast.emit("new-message", data);
        sockets.in(sala).emit("send-client", msg);
      });
    });

    client.on("join", (sala) => {
      if (sala) {
        sala = sala.replace("?", "");
      } else {
        const timestamp = new Date().toString();
        const md5 = crypto.createHash("md5");
        sala = md5.update(timestamp).digest("hex");
      }

      client.set("sala", sala);
      client.join(sala);
    });

    client.on("disconnect", () => {
      client.get("sala", (erro, sala) => {
        client.leave(sala);
      });
    });
  });
};
