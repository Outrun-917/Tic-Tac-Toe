const $newGameScreenPickPlayerIcons = document.querySelectorAll(
  ".new-game-screen-pick-player-icon"
);
const $newGameScreenNewGameCpuPlayer = document.querySelector(
  ".new-game-screen-new-game-buttons__button"
);
const $newGameScreen = document.querySelector(".new-game-screen");
const $gameScreen = document.querySelector(".game-screen");
const $gameScreenGridCells = document.querySelectorAll(
  ".game-screen-grid__cell"
);

let currentPlayer = "o";
let gameBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const crossIcon = `<svg
    width="40"
    height="40"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="game-screen-header-icons__cross"
    >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M27.681 1.63437C26.5094 0.462798 24.6099 0.4628 23.4383 1.63437L16 9.07271L8.56166 1.63437C7.39009 0.462798 5.49059 0.4628 4.31902 1.63437L1.63437 4.31902C0.462799 5.49059 0.462801 7.39009 1.63437 8.56166L9.07271 16L1.63437 23.4383C0.462798 24.6099 0.4628 26.5094 1.63437 27.681L4.31902 30.3656C5.49059 31.5372 7.39009 31.5372 8.56166 30.3656L16 22.9273L23.4383 30.3656C24.6099 31.5372 26.5094 31.5372 27.681 30.3656L30.3656 27.681C31.5372 26.5094 31.5372 24.6099 30.3656 23.4383L22.9273 16L30.3656 8.56166C31.5372 7.39009 31.5372 5.49059 30.3656 4.31902L27.681 1.63437Z"
        />
</svg>
`;

const ovalIcon = `<svg
        width="40"
        height="40"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="game-screen-header-icons__oval"
    >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M31.9704 15.8706C31.9704 7.10551 24.8649 0 16.0998 0C7.33476 0 0.229248 7.10551 0.229248 15.8706C0.229248 24.6357 7.33476 31.7412 16.0998 31.7412C24.8649 31.7412 31.9704 24.6357 31.9704 15.8706ZM9.63405 15.8706C9.63405 12.2996 12.5289 9.4048 16.0998 9.4048C19.6708 9.4048 22.5656 12.2996 22.5656 15.8706C22.5656 19.4416 19.6708 22.3364 16.0998 22.3364C12.5289 22.3364 9.63405 19.4416 9.63405 15.8706Z"
        />
</svg>
`;

const turnCrossSVG = `
<svg
  width="16"
  viewBox="0 0 32 32"
  height="16"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M27.681 1.63437C26.5094 0.462798 24.6099 0.4628 23.4383 1.63437L16 9.07271L8.56166 1.63437C7.39009 0.462798 5.49059 0.4628 4.31902 1.63437L1.63437 4.31902C0.462799 5.49059 0.462801 7.39009 1.63437 8.56166L9.07271 16L1.63437 23.4383C0.462798 24.6099 0.4628 26.5094 1.63437 27.681L4.31902 30.3656C5.49059 31.5372 7.39009 31.5372 8.56166 30.3656L16 22.9273L23.4383 30.3656C24.6099 31.5372 26.5094 31.5372 27.681 30.3656L30.3656 27.681C31.5372 26.5094 31.5372 24.6099 30.3656 23.4383L22.9273 16L30.3656 8.56166C31.5372 7.39009 31.5372 5.49059 30.3656 4.31902L27.681 1.63437Z"
  />
</svg>`;

const turnOvalSVG = `
<svg
  width="16"
  height="16"
  viewBox="0 0 32 32"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M31.9704 15.8706C31.9704 7.10551 24.8649 0 16.0998 0C7.33476 0 0.229248 7.10551 0.229248 15.8706C0.229248 24.6357 7.33476 31.7412 16.0998 31.7412C24.8649 31.7412 31.9704 24.6357 31.9704 15.8706ZM9.63405 15.8706C9.63405 12.2996 12.5289 9.4048 16.0998 9.4048C19.6708 9.4048 22.5656 12.2996 22.5656 15.8706C22.5656 19.4416 19.6708 22.3364 16.0998 22.3364C12.5289 22.3364 9.63405 19.4416 9.63405 15.8706Z"
  />
</svg>
`;

function checkWin(gameBoard) {
  // Vérifier les lignes
  for (let i = 0; i < 3; i++) {
    if (
      gameBoard[i][0] !== "" &&
      gameBoard[i][0] === gameBoard[i][1] &&
      gameBoard[i][1] === gameBoard[i][2]
    ) {
      return true;
    }
  }

  // Vérifier les colonnes
  for (let i = 0; i < 3; i++) {
    if (
      gameBoard[0][i] !== "" &&
      gameBoard[0][i] === gameBoard[1][i] &&
      gameBoard[1][i] === gameBoard[2][i]
    ) {
      return true;
    }
  }

  // Vérifier la diagonale principale
  if (
    gameBoard[0][0] !== "" &&
    gameBoard[0][0] === gameBoard[1][1] &&
    gameBoard[1][1] === gameBoard[2][2]
  ) {
    return true;
  }

  // Vérifier la diagonale secondaire
  if (
    gameBoard[0][2] !== "" &&
    gameBoard[0][2] === gameBoard[1][1] &&
    gameBoard[1][1] === gameBoard[2][0]
  ) {
    return true;
  }

  return false;
}

$newGameScreenPickPlayerIcons.forEach(function ($newGameScreenPickPlayerIcon) {
  $newGameScreenPickPlayerIcon.addEventListener("click", function () {
    for (let i = 0; i < $newGameScreenPickPlayerIcons.length; i++) {
      $newGameScreenPickPlayerIcons[i].classList.remove(
        "new-game-screen-pick-player-icon--selected"
      );
    }

    $newGameScreenPickPlayerIcon.classList.add(
      "new-game-screen-pick-player-icon--selected"
    );
    currentPlayer = $newGameScreenPickPlayerIcon.getAttribute("data-player");

    console.log(currentPlayer);
  });
});

$newGameScreenNewGameCpuPlayer.addEventListener("click", function () {
  $newGameScreen.classList.add("hidden");
  $gameScreen.classList.remove("hidden");
});

$gameScreenGridCells.forEach(function ($gameScreenGridCell) {
  $gameScreenGridCell.innerHTML = "";
});

for (let i = 0; i < $newGameScreenNewGameButtons__Buttons.length; i++) {
  $newGameScreenNewGameButtons__Buttons[i].addEventListener(
    "click",
    function (e) {
      if (
        $newGameScreenNewGameButtons__Buttons[i].classList.contains(
          "new-game-screen-new-game-buttons__button--secondary"
        )
      ) {
        console.log("PVP game selected");
        $newGameScreen.classList.add("hidden");
        $gameScreen.classList.remove("hidden");

        $gameScreenGridCells.forEach(function (e) {
          e.innerHTML = "";
        });

        $gameScreenScoreScoreNumbers.forEach(function (e) {
          e.innerHTML = "0";
        });

        $gameScreenScorePlayer[0].innerHTML = "Player 1";
        $gameScreenScorePlayer[2].innerHTML = "Player 2";
      } else {
        console.log("CPU game selected");
        $newGameScreen.classList.add("hidden");
        $gameScreen.classList.remove("hidden");

        $gameScreenGridCells.forEach(function (e) {
          e.innerHTML = "";
        });

        $gameScreenScoreScoreNumbers.forEach(function (e) {
          e.innerHTML = "0";
        });
      }
    }
  );
}

function setIconIndex(index, icon) {
  if (icon === "x") {
    if (index === 0) {
      gameBoard[0][0] = "x";
    } else if (index === 1) {
      gameBoard[0][1] = "x";
    } else if (index === 2) {
      gameBoard[0][2] = "x";
    } else if (index === 3) {
      gameBoard[1][0] = "x";
    } else if (index === 4) {
      gameBoard[1][1] = "x";
    } else if (index === 5) {
      gameBoard[1][2] = "x";
    } else if (index === 6) {
      gameBoard[2][0] = "x";
    } else if (index === 7) {
      gameBoard[2][1] = "x";
    } else if (index === 8) {
      gameBoard[2][2] = "x";
    }
  } else if (icon === "o") {
    if (index === 0) {
      gameBoard[0][0] = "o";
    } else if (index === 1) {
      gameBoard[0][1] = "o";
    } else if (index === 2) {
      gameBoard[0][2] = "o";
    } else if (index === 3) {
      gameBoard[1][0] = "o";
    } else if (index === 4) {
      gameBoard[1][1] = "o";
    } else if (index === 5) {
      gameBoard[1][2] = "o";
    } else if (index === 6) {
      gameBoard[2][0] = "o";
    } else if (index === 7) {
      gameBoard[2][1] = "o";
    } else if (index === 8) {
      gameBoard[2][2] = "o";
    }
  }
  console.log(gameBoard);
}

$gameScreenGridCells.forEach(function ($gameScreenGridCell) {
  $gameScreenGridCell.addEventListener("click", function () {
    if ($gameScreenGridCell.hasChildNodes() === false) {
      if (currentPlayer === "x") {
        $gameScreenGridCell.innerHTML = crossIcon;
        setIconIndex(
          parseInt($gameScreenGridCell.getAttribute("data-index")),
          "x"
        );
        currentPlayer = "o";

        const result = checkWin(gameBoard);

        console.log(result);
      } else {
        $gameScreenGridCell.innerHTML = ovalIcon;
        setIconIndex(
          parseInt($gameScreenGridCell.getAttribute("data-index")),
          "o"
        );
        currentPlayer = "x";

        const result = checkWin(gameBoard);

        console.log(result);
      }
    }
  });
});
