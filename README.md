## Sequence Game (Javascript)

### Description:
This game has been built using React for the fronted and WebSockets for client to server communication.

### How to play:
1. Clone the repo
2. Start the server:
  `node server.js'
3. In your browser go to the link: localhost:3000/mydoc
4. The game waits for four players to connect, and then begins.
5. Players 1 and 2 are green while players 2 and 4 are blue. The players play in teams according to color. 
6. Each player is given a set of 6 unique cards.
7. You play a move by clicking a card on the board. If the card is in your set of cards, a coin with your color is placed on the board, over that card.
8. The 'jack' card can be used to put a coin anywhere where there isn't already a card. 
9. The first team to get a sequence of 5 (up, down, right, left, or horizontally) wins!

### Dependency
Node
