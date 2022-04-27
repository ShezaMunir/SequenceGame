const fs = require(`fs`);
const http = require(`http`);
const WebSocket = require(`ws`); // npm i ws

const board = [
  [
    "card back",
    "card rank-2 spades",
    "card rank-3 spades",
    "card rank-4 spades",
    "card rank-5 spades",
    "card rank-10 diams",
    "card rank-q diams",
    "card rank-k diams",
    "card rank-a diams",
    "card back",
  ],

  [
    "card rank-6 clubs",
    "card rank-5 clubs",
    "card rank-4 clubs",
    "card rank-3 clubs",
    "card rank-2 clubs",
    "card rank-4 spades",
    "card rank-5 spades",
    "card rank-6 spades",
    "card rank-7 spades",
    "card rank-a clubs",
  ],

  [
    "card rank-7 clubs",
    "card rank-a spades",
    "card rank-2 diams",
    "card rank-3 diams",
    "card rank-4 diams",
    "card rank-k clubs",
    "card rank-q clubs",
    "card rank-10 clubs",
    "card rank-8 spades",
    "card rank-k clubs",
  ],

  [
    "card rank-8 clubs",
    "card rank-k spades",
    "card rank-6 clubs",
    "card rank-5 clubs",
    "card rank-4 clubs",
    "card rank-9 hearts",
    "card rank-8 hearts",
    "card rank-9 clubs",
    "card rank-9 spades",
    "card rank-6 spades",
  ],

  [
    "card rank-9 clubs",
    "card rank-q spades",
    "card rank-7 clubs",
    "card rank-6 hearts",
    "card rank-5 hearts",
    "card rank-2 hearts",
    "card rank-7 hearts",
    "card rank-8 clubs",
    "card rank-10 spades",
    "card rank-10 clubs",
  ],

  [
    "card rank-a spades",
    "card rank-7 hearts",
    "card rank-9 diams",
    "card rank-a hearts",
    "card rank-4 hearts",
    "card rank-3 hearts",
    "card rank-k hearts",
    "card rank-10 diams",
    "card rank-6 hearts",
    "card rank-2 diams",
  ],

  [
    "card rank-k spades",
    "card rank-8 hearts",
    "card rank-8 diams",
    "card rank-2 clubs",
    "card rank-3 clubs",
    "card rank-10 hearts",
    "card rank-q hearts",
    "card rank-q diams",
    "card rank-5 hearts",
    "card rank-3 diams",
  ],

  [
    "card rank-q spades",
    "card rank-9 hearts",
    "card rank-7 diams",
    "card rank-6 diams",
    "card rank-5 diams",
    "card rank-a clubs",
    "card rank-a diams",
    "card rank-k diams",
    "card rank-4 hearts",
    "card rank-4 diams",
  ],

  [
    "card rank-10 spades",
    "card rank-10 hearts",
    "card rank-q hearts",
    "card rank-k hearts",
    "card rank-a hearts",
    "card rank-3 spades",
    "card rank-2 spades",
    "card rank-2 hearts",
    "card rank-3 hearts",
    "card rank-5 diams",
  ],

  [
    "card back",
    "card rank-9 spades",
    "card rank-8 spades",
    "card rank-7 spades",
    "card rank-6 spades",
    "card rank-9 diams",
    "card rank-8 diams",
    "card rank-7 diams",
    "card rank-6 diams",
    "card back",
  ],
];

const positionBoard = [
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
];

function checkVertical(turn, i, j, numToCheck) {
  let semcount = 0;
  for (let y = 0; y < positionBoard[0].length; y++) {
    if (positionBoard[y][j] == turn) {
      semcount += 1;
    } else {
      semcount = 0;
    }

    if (semcount == numToCheck) {
      return true;
    }
  }
  return false;
}

function checkDiagRL(turn, i, j, numToCheck) {
  let x = i;
  let y = j;
  let semcount = 0;

  while (x < positionBoard[0].length && y >= 0) {
    if (positionBoard[x][y] == turn) {
      semcount += 1;
    } else {
      // semcount = 0;
      break;
    }
    if (semcount == numToCheck) {
      // console.log(semcount);
      return true;
    }

    x++;
    y--;
  }
  x = i - 1;
  y = j + 1;

  while (y < positionBoard[0].length && x >= 0) {
    if (positionBoard[x][y] == turn) {
      semcount += 1;
    } else {
      semcount = 0;
    }
    if (semcount == numToCheck) {
      return true;
    }

    x--;
    y++;
  }

  return false;
}

function checkDiagLR(turn, i, j, numToCheck) {
  let x = i;
  let y = j;
  let semcount = 0;

  while (x < positionBoard[0].length && y < positionBoard[0].length) {
    // console.log(x,y);
    if (positionBoard[x][y] == turn) {
      semcount += 1;
    } else {
      // semcount = 0;
      break;
    }
    if (semcount == numToCheck) {
      // console.log(semcount);
      return true;
    }

    x++;
    y++;
  }
  x = i - 1;
  y = j - 1;

  while (y >= 0 && x >= 0) {
    console.log(x, y);
    if (positionBoard[x][y] == turn) {
      // console.log(positionBoard[x][y], x,y);
      semcount += 1;
    } else {
      semcount = 0;
    }
    if (semcount == numToCheck) {
      // console.log(semcount);
      return true;
    }

    x--;
    y--;
  }

  return false;
}

function checkHorizontal(turn, i, j, numToCheck) {
  let semcount = 0;
  for (let x = 0; x < positionBoard[0].length; x++) {
    if (positionBoard[i][x] == turn) {
      semcount += 1;
    } else {
      semcount = 0;
    }

    if (semcount == numToCheck) {
      return true;
    }
  }
  return false;
}

const checkWinnerBoard = (turn, i, j) => {
  if (
    checkHorizontal(turn, i, j, 5) |
    checkVertical(turn, i, j, 5) |
    checkDiagRL(turn, i, j, 5) |
    checkDiagLR(turn, i, j, 5)
  ) {
    return true;
  } else {
    return false;
  }
};

const updatePositionBoard = (row, column, turn) => {
  for (let i = 0; i < positionBoard.length; i++) {
    for (let j = 0; j < positionBoard[i].length; j++) {
      if (i == row && j == column) {
        positionBoard[i][j] = turn;
      }
    }
  }
};

const deck = [
  "card rank-a spades",
  "card rank-2 spades",
  "card rank-3 spades",
  "card rank-4 spades",
  "card rank-5 spades",
  "card rank-6 spades",
  "card rank-7 spades",
  "card rank-8 spades",
  "card rank-9 spades",
  "card rank-10 spades",
  "card rank-j spades",
  "card rank-q spades",
  "card rank-k spades",
  "card rank-a clubs",
  "card rank-2 clubs",
  "card rank-3 clubs",
  "card rank-4 clubs",
  "card rank-5 clubs",
  "card rank-6 clubs",
  "card rank-7 clubs",
  "card rank-8 clubs",
  "card rank-9 clubs",
  "card rank-10 clubs",
  "card rank-j clubs",
  "card rank-q clubs",
  "card rank-k clubs",
  "card rank-a diams",
  "card rank-2 diams",
  "card rank-3 diams",
  "card rank-4 diams",
  "card rank-5 diams",
  "card rank-6 diams",
  "card rank-7 diams",
  "card rank-8 diams",
  "card rank-9 diams",
  "card rank-10 diams",
  "card rank-j diams",
  "card rank-q diams",
  "card rank-k diams",
  "card rank-a hearts",
  "card rank-2 hearts",
  "card rank-3 hearts",
  "card rank-4 hearts",
  "card rank-5 hearts",
  "card rank-6 hearts",
  "card rank-7 hearts",
  "card rank-8 hearts",
  "card rank-9 hearts",
  "card rank-10 hearts",
  "card rank-j hearts",
  "card rank-q hearts",
  "card rank-k hearts",
];

const divideDeckIntoPieces = (deck) => {
  let shuffled = deck
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  const result = new Array(Math.ceil(shuffled.length / 6))
    .fill()
    .map((_) => shuffled.splice(0, 6));
  // console.log(result);
  return result;
};

// code to read file
const readFile = (fileName) =>
  new Promise((resolve, reject) => {
    fs.readFile(fileName, `utf-8`, (readErr, fileContents) => {
      if (readErr) {
        reject(readErr);
      } else {
        resolve(fileContents);
      }
    });
  });

// code to create a server
const server = http.createServer(async (req, resp) => {
  console.log(`browser asked for ${req.url}`);
  if (req.url == `/mydoc`) {
    const clientHtml = await readFile(`client.html`);
    resp.end(clientHtml);
  } else if (req.url == `/myjs`) {
    const clientJs = await readFile(`client.js`);
    resp.end(clientJs);
  } else if (req.url == `/sequence.css`) {
    const sequenceCss = await readFile(`sequence.css`);
    resp.end(sequenceCss);
  } else {
    resp.end(`not found`);
  }
});

// to listen for clients
server.listen(8000);

// creating a web socket
const wss = new WebSocket.Server({ port: 8080 });

const clients = new Map();
let clientID = 0;
let connected_4 = false;
let clientdeck = divideDeckIntoPieces(deck);
const turns = ["green", "blue", "green", "blue"];
let currentTurn = 1;
let WIN = false;
let playersOuttaCards = 0;
let cycle = 1;

wss.on("connection", (ws) => {
  clientID += 1;
  const ID = clientID;
  const clientInfo = { ID };
  clients.set(ws, clientInfo);
  // ws is unique for each connection

  const starter = {
    type: "initial",
    turn: turns[clientID - 1],
    turnNumber: clientID,
  };
  ws.send(JSON.stringify(starter));

  if (clientID == 4) {
    connected_4 = true;
    console.log("all conn");
  }

  if (connected_4 == true) {
    console.log("intrue");

    let deck_index = 0;

    for (let [player, playerNum] of clients) {
      console.log("here");
      player.send(
        JSON.stringify({
          type: "update_message",
          msg: "It is Player " + currentTurn + "'s turn.",

          currentTurn: currentTurn,
        })
      );
      player.on("message", (strJSON) => {
        let str = JSON.parse(strJSON);

        if (str.type == "start") {
          // console.log("client said:", str.msg);
          jsondata = {
            type: "newboard",
            board: board,
            positionBoard: positionBoard,
            currentTurn: currentTurn,
            // "turn" : turns[1],
          };
          player.send(JSON.stringify(jsondata));

          // console.log(clientdeck[0]);
          const clientdeck1 = clientdeck[deck_index];
          deck_index++;
          let message2 = {
            type: "clientdeck",
            clientdeck: clientdeck1,
          };
          player.send(JSON.stringify(message2));
        }

        if (str.type == "outta_cards") {
          playersOuttaCards++;
        }

        if (playersOuttaCards == 4 && cycle == 2) {
          console.log("DRAWWW" + currentTurn);
          let drawMessage = {
            type: "DRAW",

            stop: "yes",
          };

          for (let gottaUpdate of clients.keys()) {
            gottaUpdate.send(JSON.stringify(drawMessage));
          }
        } else if (playersOuttaCards == 4) {
          playersOuttaCards = 0;
          cycle = 2;

          for (let cardAgain of clients.keys()) {
            const clientdeck1 = clientdeck[deck_index];
            deck_index++;
            let message2 = {
              type: "clientdeck",
              clientdeck: clientdeck1,
            };
            cardAgain.send(JSON.stringify(message2));
            //  cardAgain.send(JSON.stringify(sendBoardBack));
          }
        }
        if (str.type == "positionUpdate") {
          // console.log(positionBoard);
          updatePositionBoard(str.row, str.column, str.turn);
          WIN = checkWinnerBoard(str.turn, str.row, str.column);

          let lastTurn = currentTurn;
          if (currentTurn == 4) {
            currentTurn = 1;
          } else {
            currentTurn++;
          }

          // console.log(positionBoard);
          let sendBoardBack = {
            type: "updatedPosboard",
            posBoard: positionBoard,
            currentTurn: currentTurn,
            msg: "It is Player " + currentTurn + "'s turn.",
          };
          for (let gottaUpdate of clients.keys()) {
            gottaUpdate.send(JSON.stringify(sendBoardBack));
          }

          if (WIN) {
            // send to all that a person have won, break, close connection
            console.log("WINNER WINNER CHICKEN DINNER" + currentTurn);
            let winMessage = {
              type: "WIN",
              turn: lastTurn,
              color: turns[lastTurn - 1],
              stop: "yes",
            };

            for (let gottaUpdate of clients.keys()) {
              gottaUpdate.send(JSON.stringify(winMessage));
            }
          }
        }
      });
    }
  }
});
