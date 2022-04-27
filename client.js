const ws = new WebSocket(`ws://localhost:8080`);

const Sequence = () => {
  // hooks
  const [board, setBoard] = React.useState([[]]);
  const [positionBoard, setPositionBoard] = React.useState([[]]);
  const [cards, setCards] = React.useState([]);
  const [deck, setDeck] = React.useState([]);
  const [currTurn, setCurrTurn] = React.useState(0);

  const [msgShow, setMsgShow] = React.useState(
    "Welcome to Sequence! Waiting for players."
  );
  const [turn, setTurn] = React.useState("none");
  let [myTurnNumber, setMyTurnNum] = React.useState(0);

  let diamondSign = "♦";
  let heartSign = "♥";
  let spadesSign = "♠";
  let clubsSign = "♣";

  // connect to server
  ws.onopen = () => {
    let msgElement = document.createElement("div");
    msgElement.textContent = "Connection with server established.";

    document.getElementById("root").append(msgElement);
  };

  // handle messages from server
  ws.onmessage = function (event) {
    console.log("ONMESSAGE");

    let msgElement = document.createElement("div");
    let jsonData = JSON.parse(event.data);
    if (jsonData.type == "newboard") {
      let newboard = jsonData.board;

      setPositionBoard(jsonData.positionBoard);
      setBoard(newboard);

      setCurrTurn(jsonData.currentTurn);
    }
    if (jsonData.type == "clientdeck") {
      setDeck(jsonData.clientdeck);
    }

    if (jsonData.type == "updatedPosboard") {
      if (myTurnNumber == jsonData.currentTurn) {
        setMsgShow("It is your turn.");
      } else {
        setMsgShow(jsonData.msg);
      }

      setCurrTurn(jsonData.currentTurn);
      setPositionBoard(jsonData.posBoard);
    }

    if (jsonData.type == "update_message") {
      if (myTurnNumber == jsonData.currentTurn) {
        setMsgShow("It is your turn.");
      } else {
        setMsgShow(jsonData.msg);
      }

      setCurrTurn(jsonData.currentTurn);
      ws.send(
        JSON.stringify({
          type: "start",
          msg: "hello",
        })
      );
    }

    if (jsonData.type == "initial") {
      setTurn(jsonData.turn);
      setMyTurnNum(jsonData.turnNumber);
    }
    if (jsonData.type == "WIN") {
      if (jsonData.stop == "yes") {
        setCurrTurn(-1);
        setMsgShow(jsonData.color + " wins!");
      }
    }
    if (jsonData.type == "DRAW") {
      if (jsonData.stop == "yes") {
        setCurrTurn(-1);
        setMsgShow("Game ends with a draw!");
      }
    }
  };

  // handle board clicks
  const handleBoardClick = (inner, i, j) => {
    console.log("Card" + inner + " was clicked");

    console.log(positionBoard[i][j]);
    if (currTurn == myTurnNumber) {
      let valid = false;
      let new_deck = [];
      for (let i = 0; i < deck.length; i++) {
        if (deck[i] == inner) {
          console.log("From deck" + deck[i]);
          valid = true;
        } else {
          new_deck.push(deck[i]);
        }
      }
      if (!valid) {
        for (let i = 0; i < deck.length; i++) {
          if (
            (deck[i] == "card rank-j hearts") |
            (deck[i] == "card rank-j diams") |
            (deck[i] == "card rank-j spades") |
            (deck[i] == "card rank-j clubs")
          ) {
            valid = true;
            console.log("Card" + inner + " JACKKKKKwas clicked");
            new_deck.splice(i, 1);
          }
        }
      }

      if (valid) {
        setDeck(new_deck);
        let possUpdate = {
          type: "positionUpdate",
          row: j,
          column: i,
          turn: turn,
        };
        setMsgShow("Valid move.");
        ws.send(JSON.stringify(possUpdate));
      } else {
        setMsgShow("Invalid move. Try again.");
      }

      if (new_deck.length == 0) {
        let outta_cards = {
          type: "outta_cards",
        };
        ws.send(JSON.stringify(outta_cards));
      }
    } else {
      if (currTurn == -1) {
        setMsgShow("The game has ended. Restart to play again.");
      } else {
        setMsgShow(
          "It is not your turn, it is Player " + currTurn + "'s turn."
        );
      }
    }
  };

  let mycards = board.map((arr, i) => {
    return (
      <div>
        {/* <div> */}
        <div className="playingCards fourColours rotateHand">
          <ul className="table">
            {arr.map((inner, j) => {
              let rankindex = inner.indexOf("rank");

              let rankk;
              if (inner[rankk + 1] !== " ") {
                rankk = inner[rankindex + 5] + inner[rankindex + 6];
              } else {
                rankk = inner[rankindex + 5];
              }

              let mysuit = inner.split(" ").map((piece) => {
                if (
                  piece == "clubs" ||
                  piece == "diams" ||
                  piece == "hearts" ||
                  piece == "spades"
                ) {
                  return piece;
                }
              });

              let selected_suit;
              switch (mysuit[2]) {
                case "diams":
                  selected_suit = diamondSign;
                  break;
                case "clubs":
                  selected_suit = clubsSign;
                  break;
                case "hearts":
                  selected_suit = heartSign;
                  break;
                case "spades":
                  selected_suit = spadesSign;
                  break;
                default:
                  selected_suit = "";
              }

              return (
                <div>
                  <li>
                    {positionBoard[j][i] == "-" ? (
                      <div
                        onClick={() => {
                          handleBoardClick(inner, i, j);
                        }}
                        className={inner}
                      >
                        <span className="rank">{rankk}</span>
                        <span className="suit">{selected_suit}</span>
                      </div>
                    ) : (
                      <div className="card">
                        <div className={positionBoard[j][i]}></div>
                      </div>
                    )}
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
        {/* </div> */}
      </div>
    );
  });

  let clientDeckCards = deck.map((clientCard) => {
    let rankClient;
    let rankindex2 = clientCard.indexOf("rank");
    if (clientCard[rankClient + 1] !== " ") {
      rankClient = clientCard[rankindex2 + 5] + clientCard[rankindex2 + 6];
    } else {
      rankClient = clientCard[rankindex2 + 5];
    }
    let mysuit = clientCard.split(" ").map((piece) => {
      if (
        piece == "clubs" ||
        piece == "diams" ||
        piece == "hearts" ||
        piece == "spades"
      ) {
        return piece;
      }
    });
    //  console.log(mysuit[2]);
    let selected_suit;
    switch (mysuit[2]) {
      case "diams":
        selected_suit = diamondSign;
        break;
      case "clubs":
        selected_suit = clubsSign;
        break;
      case "hearts":
        selected_suit = heartSign;
        break;
      case "spades":
        selected_suit = spadesSign;
        break;
      default:
        selected_suit = "";
    }

    return (
      <li>
        <a class={clientCard}>
          <span class="rank">{rankClient}</span>
          <span class="suit">{selected_suit}</span>
        </a>
      </li>
    );
  });

  return (
    <div>
      <div className="container">
        {mycards}

        <div></div>
      </div>
      <div className="container">
        <div>
          <h1>Your Cards:</h1>
        </div>
        {/* code for client cards comes here */}
        <div class="playingCards fourColours rotateHand">
          <ul class="table">{clientDeckCards}</ul>
        </div>
        {/* code for text box comes here */}
        <div className="text_box">
          {" "}
          {"Player " + myTurnNumber + ": " + msgShow}{" "}
        </div>
        {/* code for circle representing the players team color comes here */}
        <div className={"color " + turn}></div>
      </div>
    </div>
  );
};

ReactDOM.render(<Sequence />, document.querySelector(`#root`));
