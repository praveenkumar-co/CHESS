const { Chess } = require("chess.js");
const chess = new Chess();

let boardState = chess.fen();
const players = {};
let currentPlayer = "w";

module.exports = function (io) {
  io.on("connection", function (uniquesocket) {
    if (!players.white) {
      players.white = uniquesocket.id;
      uniquesocket.emit("playerRole", "w");
    } else if (!players.black) {
      players.black = uniquesocket.id;
      uniquesocket.emit("playerRole", "b");
    } else {
      uniquesocket.emit("Spectator Role");
    }

    uniquesocket.emit("boardState", boardState);
  uniquesocket.on("chatMessage", (msg) => {
  const sender =
    uniquesocket.id === players.white ? "white" :
    uniquesocket.id === players.black ? "black" : "Spectator";
  console.log("Server received message:", msg);
  io.emit("chatMessage", { sender, message: msg });
});
    uniquesocket.on("disconnect", function () {
      if (uniquesocket.id === players.white) {
        delete players.white;
      } else if (uniquesocket.id === players.black) {
        delete players.black;
      }
    });

    uniquesocket.on("move", (move) => {
      try {
        if (chess.turn() === "w" && uniquesocket.id !== players.white) return;
        if (chess.turn() === "b" && uniquesocket.id !== players.black) return;

        const result = chess.move(move);
        if (result) {
          currentPlayer = chess.turn();
          boardState = chess.fen();
          io.emit("move", move);
          io.emit("boardState", boardState);
        } else {
          uniquesocket.emit("InvalidMove", move);
        }
      } catch (err) {
        console.log(err);
        uniquesocket.emit("Invalid Move", move);
      }
    });
  });
};
