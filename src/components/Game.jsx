import React, { useState } from "react";

const emojiCategories = {
  Animals: ["🐶", "🐱", "🦊"],
  Food: ["🍎", "🍕", "🍔"],
  Sports: ["⚽", "🏀", "🏈"],
};

const initialBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

export default function Game() {
  const [player1Category, setPlayer1Category] = useState("");
  const [player2Category, setPlayer2Category] = useState("");
  const [categorySelected, setCategorySelected] = useState(false);
  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState("p1");
  const [player1Positions, setPlayer1Positions] = useState([]);
  const [player2Positions, setPlayer2Positions] = useState([]);
  const [winner, setWinner] = useState(null);

  const getRandomEmoji = (category) => {
    const emojis = emojiCategories[category];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  const checkWinner = (board) => {
    const lines = [
      // rows
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      // columns
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      // diagonals
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];

    for (const [a, b, c] of lines) {
      const cellA = board[a[0]][a[1]];
      const cellB = board[b[0]][b[1]];
      const cellC = board[c[0]][c[1]];

      if (cellA && cellA === cellB && cellB === cellC) {
        if (emojiCategories[player1Category]?.includes(cellA)) return "Player 1";
        if (emojiCategories[player2Category]?.includes(cellA)) return "Player 2";
      }
    }

    return null;
  };

  const handleClick = (row, col) => {
    if (winner || board[row][col] !== "") return;

    const category = turn === "p1" ? player1Category : player2Category;
    const positions = turn === "p1" ? player1Positions : player2Positions;
    const setPositions = turn === "p1" ? setPlayer1Positions : setPlayer2Positions;

    const emoji = getRandomEmoji(category);
    const newBoard = board.map((r) => [...r]);
    const newPositions = [...positions];

    if (newPositions.length === 3) {
      const [r, c] = newPositions.shift();
      newBoard[r][c] = "";
    }

    newBoard[row][col] = emoji;
    newPositions.push([row, col]);
    setBoard(newBoard);
    setPositions(newPositions);

    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
    } else {
      setTurn(turn === "p1" ? "p2" : "p1");
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setTurn("p1");
    setWinner(null);
    setPlayer1Positions([]);
    setPlayer2Positions([]);
    setCategorySelected(false);
    setPlayer1Category("");
    setPlayer2Category("");
  };

  const startGame = () => {
    if (!player1Category || !player2Category) {
      alert("Please select categories for both players.");
      return;
    }
    if (player1Category === player2Category) {
      alert("Please select different categories.");
      return;
    }
    setCategorySelected(true);
  };

  return (
    <div
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: "100vh",
    background: "linear-gradient(135deg,rgb(247, 202, 204) 0%, rgb(195, 167, 160) 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  }}
>
        <div
  style={{
   background: "linear-gradient(145deg, #e0eafc, #cfdef3)",
    borderRadius: "24px",
    padding: "40px 30px",
    boxShadow: "12px 12px 24px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(138, 28, 28, 0.7)",
    width: "360px",
    color: "#332",
    textAlign: "center",
    border: "1px solidrgb(28, 100, 21)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    transition: "transform 0.3s ease",
    
  }}
>
        <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "1rem" }}>
          Blink Tic Tac Toe
        </h1>

        {!categorySelected ? (
          <>
            <div style={{ marginBottom: "1rem", textAlign: "left" }}>
              <label style={{ fontWeight: "600" }}>Player 1: Choose Category</label>
              <select
                style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "10px",
                    border: "none",
                    marginTop: "0.5rem",
                    fontSize: "1rem",
                    color: "#333",
                    backgroundColor: "white",
                }}
                value={player1Category}
                onChange={(e) => setPlayer1Category(e.target.value)}
                >
                <option value="">Select</option>
                {Object.keys(emojiCategories).map((cat) => (
                    <option key={cat} value={cat}>
                    {cat}
                    </option>
                ))}
                </select>

            </div>

            <div style={{ marginBottom: "1.5rem", textAlign: "left" }}>
              <label style={{ fontWeight: "600" }}>Player 2: Choose Category</label>
                            <select
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "10px",
                      border: "none",
                      marginTop: "0.5rem",
                      fontSize: "1rem",
                      color: "#333",
                      backgroundColor: "white",
                    }}
                    value={player2Category}
                    onChange={(e) => setPlayer2Category(e.target.value)}
                  >
                    <option value="">Select</option>
                    {Object.keys(emojiCategories).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>


            </div>

            <button
              onClick={startGame}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "15px",
                border: "none",
                backgroundColor: "#6b46c1",
                fontWeight: "700",
                color: "white",
                fontSize: "1.1rem",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#553c9a")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#6b46c1")}
            >
              Start Game
            </button>
          </>
        ) : (
          <>
            <div style={{ marginBottom: "1rem", fontSize: "1.25rem", fontWeight: "600" }}>
              {winner ? (
                <span style={{ color: "#9ae6b4" }}>{winner} Wins! 🎉</span>
              ) : (
                <span>
                  Turn: <strong>{turn === "p1" ? "Player 1" : "Player 2"}</strong>
                </span>
              )}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "15px",
                marginBottom: "1.5rem",
              }}
            >
              {board.map((row, i) =>
                row.map((cell, j) => (
                  <button
                    key={`${i}-${j}`}
                    onClick={() => handleClick(i, j)}
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "15px",
                      backgroundColor: "rgba(255, 255, 255, 0.25)",
                      border: "none",
                      fontSize: "2rem",
                      color: "#fff",
                      cursor: winner || cell ? "default" : "pointer",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      if (!winner && !cell) e.target.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      if (!winner && !cell) e.target.style.backgroundColor = "rgba(255, 255, 255, 0.25)";
                    }}
                    disabled={!!winner || !!cell}
                  >
                    {cell}
                  </button>
                ))
              )}
            </div>

            <button
              onClick={resetGame}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "15px",
                border: "none",
                backgroundColor: "#e53e3e",
                fontWeight: "700",
                color: "white",
                fontSize: "1.1rem",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#9b2c2c")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#e53e3e")}
            >
              Play Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
