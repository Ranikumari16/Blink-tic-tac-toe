import React, { useState } from "react";

export default function Help() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() => setShowHelp(!showHelp)}
        className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded"
      >
        {showHelp ? "Hide How to Play" : "Show How to Play"}
      </button>

      {showHelp && (
        <div className="bg-yellow-50 border border-yellow-300 p-4 rounded mt-4 text-sm">
          <h3 className="font-semibold mb-2">How to Play</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>The game is on a 3x3 grid.</li>
            <li>Each player chooses an emoji category before starting.</li>
            <li>On your turn, a random emoji from your category is placed on an empty cell.</li>
            <li>Each player can have only 3 emojis on the board at a time.</li>
            <li>If you place a 4th emoji, your oldest emoji disappears (vanishing rule).</li>
            <li>You cannot place your new emoji on the cell where your oldest emoji was.</li>
            <li>The first player to get 3 in a row (horizontal, vertical, diagonal) wins.</li>
            <li>There are no draws because the board never fully fills.</li>
          </ul>
        </div>
      )}
    </div>
  );
}

