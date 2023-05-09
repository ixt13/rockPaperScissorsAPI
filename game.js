const url = "https://skypro-rock-scissors-paper.herokuapp.com/";
let token = "";
let playerStatus = "";
let check = 0;
let gameID = "";
let enemyNickName = "";
let gameStatus = "";

class game {
  constructor(container) {
    this.container = container;
    this.login();
    this.login = this.login.bind(this);
    this.gameMenu = this.gameMenu.bind(this);
    this.lobby = this.lobby.bind(this);
    this.waitMenu = this.waitMenu.bind(this);
    this.gameMenu = this.gameMenu.bind(this);
    this.waitForMoveMenu = this.waitForMoveMenu.bind(this);
    this.loseResult = this.loseResult.bind(this);
    this.winResult = this.winResult.bind(this);
  }

  login() {
    this.container.replaceChildren();
    container.appendChild(templateEngine(loginTemplate()));

    const loginInput = document.querySelector(".loginInput");
    const loginButton = document.querySelector(".loginButton");
    loginButton.disabled = true;

    loginInput.addEventListener("input", (event) => {
      if (loginInput.value != "") {
        loginButton.disabled = false;
      } else if (loginInput.value === "") {
        loginButton.disabled = true;
      }
    });

    loginButton.addEventListener("click", (event) => {
      event.preventDefault();
      request({
        url: `${url}login?login=${loginInput.value}`,
        onSuccess: (data) => {
          console.log(data);
          token = data.token;
          request({
            url: `${url}player-status?token=${token}`,
            onSuccess: (data) => {
              playerStatus = data["player-status"].status;
              console.log(playerStatus);
              if (playerStatus === "lobby") {
                this.lobby();
              }
              if (playerStatus === "game") {
                gameID = data["player-status"].game.id;
                request({
                  url: `${url}game-status?token=${token}&id=${gameID}`,
                  onSuccess: (data) => {
                    enemyNickName = data["game-status"].enemy.login;
                    this.gameMenu();
                  },
                  onError: (data) => {},
                });
              }
            },
            onError: (data) => {},
          });
        },
        onError: (data) => {},
      });
    });
  }

  lobby() {
    this.container.replaceChildren();
    container.appendChild(templateEngine(lobbyTemplate()));

    let timer = setInterval(
      () =>
        request({
          url: `${url}player-list`,
          onSuccess: (data) => {
            const lobbyPlayerList = document.querySelector(".lobbyPlayerList");
            const playerList = data.list;
            lobbyPlayerList.innerHTML = "";
            for (let i = 0; i < playerList.length; i++) {
              const player = document.createElement("div");
              player.classList.add("playerName");
              player.textContent = playerList[i].login;
              lobbyPlayerList.appendChild(player);
            }
            console.log("update");
          },
          onError: (data) => {},
        }),
      1000
    );

    const playButton = document.querySelector(".playButton");

    playButton.addEventListener("click", (event) => {
      setTimeout(() => {
        clearInterval(timer);
      });
      this.waitMenu();
    });
  }

  waitMenu() {
    this.container.replaceChildren();
    container.appendChild(templateEngine(waitTemplate()));

    request({
      url: `${url}start?token=${token}`,
      onSuccess: (data) => {
        console.log(data);
        if (data["player-status"]) {
          gameID = data["player-status"].game.id;
        }

        this.waitMenuRequest();
      },
      onError: (data) => {},
    });
  }

  waitMenuRequest() {
    setTimeout(() => {
      request({
        url: `${url}game-status?token=${token}&id=${gameID}`,
        onSuccess: (data) => {
          gameStatus = data["game-status"].status;

          if (gameStatus === "waiting-for-start") {
            console.log("update");
            this.waitMenuRequest();
          }
          if (gameStatus === "waiting-for-your-move") {
            enemyNickName = data["game-status"].enemy.login;

            this.gameMenu();
          }
        },
        onError: (data) => {},
      });
    }, 1000);
  }

  gameMenu() {
    this.container.replaceChildren();
    container.appendChild(templateEngine(gameTemplate()));
    const stoneButton = document.querySelector(".stoneButton");
    const scissorButton = document.querySelector(".scissorButton");
    const paperButton = document.querySelector(".paperButton");

    request({
      url: `${url}start?token=${token}`,
      onSuccess: (data) => {
        if (data["player-status"]) {
          gameID = data["player-status"].game.id;
        }
      },
      onError: (data) => {},
    });

    stoneButton.addEventListener("click", (event) => {
      request({
        url: `${url}play?token=${token}&id=${gameID}&move=rock`,
        onSuccess: (data) => {
          console.log(data);

          if (data["game-status"]) {
            gameStatus = data["game-status"].status;
          }
          if (data.message === "game not started") {
            const notyf = new Notyf();
            notyf.error("Противник не начал игру или вышел!");

            return;
          }

          if (gameStatus === "waiting-for-enemy-move") {
            this.waitForMoveMenu();
          }

          if (gameStatus === "lose") {
            this.loseResult();
          }

          if (gameStatus === "win") {
            this.winResult();
          }

          if (gameStatus === "waiting-for-your-move") {
            console.log("ничья - повторите ход");

            const notyf = new Notyf({
              types: [
                {
                  type: "info",
                  background: "blue",
                  icon: false,
                },
              ],
            });
            notyf.open({
              type: "info",
              message: "Ничья - повторите ход!",
            });
          }
        },
        onError: (data) => {
          console.log(data);
        },
      });
    });

    scissorButton.addEventListener("click", (event) => {
      request({
        url: `${url}play?token=${token}&id=${gameID}&move=scissors`,
        onSuccess: (data) => {
          console.log(data);

          if (data["game-status"]) {
            gameStatus = data["game-status"].status;
          }
          if (data.message === "game not started") {
            const notyf = new Notyf();
            notyf.error("Противник не начал игру или вышел!");
            return;
          }

          if (gameStatus === "waiting-for-enemy-move") {
            this.waitForMoveMenu();
          }

          if (gameStatus === "lose") {
            this.loseResult();
          }

          if (gameStatus === "win") {
            this.winResult();
          }

          if (gameStatus === "waiting-for-your-move") {
            console.log("ничья - повторите ход");

            const notyf = new Notyf({
              types: [
                {
                  type: "info",
                  background: "blue",
                  icon: false,
                },
              ],
            });
            notyf.open({
              type: "info",
              message: "Ничья - повторите ход!",
            });
          }
        },
        onError: (data) => {
          console.log(data);
        },
      });
    });

    paperButton.addEventListener("click", (event) => {
      request({
        url: `${url}play?token=${token}&id=${gameID}&move=paper`,
        onSuccess: (data) => {
          console.log(data);

          if (data["game-status"]) {
            gameStatus = data["game-status"].status;
          }
          if (data.message === "game not started") {
            const notyf = new Notyf();
            notyf.error("Противник не начал игру или вышел!");
            return;
            debugger;
          }

          if (gameStatus === "waiting-for-enemy-move") {
            this.waitForMoveMenu();
          }

          if (gameStatus === "lose") {
            this.loseResult();
          }

          if (gameStatus === "win") {
            this.winResult();
          }

          if (gameStatus === "waiting-for-your-move") {
            console.log("ничья - повторите ход");

            const notyf = new Notyf({
              types: [
                {
                  type: "info",
                  background: "blue",
                  icon: false,
                },
              ],
            });
            notyf.open({
              type: "info",
              message: "Ничья - повторите ход!",
            });
          }
        },
        onError: (data) => {
          console.log(data);
        },
      });
    });
  }

  waitForMoveMenuRequest() {
    setTimeout(() => {
      request({
        url: `${url}game-status?token=${token}&id=${gameID}`,
        onSuccess: (data) => {
          gameStatus = data["game-status"].status;
          console.log(gameStatus);

          if (gameStatus === "waiting-for-enemy-move") {
            console.log("update");
            this.waitForMoveMenuRequest();
          }

          if (gameStatus === "lose") {
            this.loseResult();
          }

          if (gameStatus === "win") {
            this.winResult();
          }

          if (gameStatus === "waiting-for-your-move") {
            console.log("ничья - повторите ход");

            this.gameMenu();
            const notyf = new Notyf({
              duration: 5000,
              types: [
                {
                  type: "info",
                  background: "blue",
                  icon: false,
                },
              ],
            });
            notyf.open({
              type: "info",
              message: "Ничья - повторите ход!",
            });
          }
        },
        onError: (data) => {
          console.log(data);
        },
      });
    }, 1000);
  }

  waitForMoveMenu() {
    this.container.replaceChildren();
    container.appendChild(templateEngine(waitMoveTemplate()));

    this.waitForMoveMenuRequest();
  }

  loseResult() {
    this.container.replaceChildren();
    container.appendChild(templateEngine(loseTemplate()));
    const goToGameButton = document.querySelector(".button-goToGame");
    goToGameButton.addEventListener("click", (event) => {
      this.gameMenu();
    });
    const goToLobbyButton = document.querySelector(".button-goToLobby");
    goToLobbyButton.addEventListener("click", (event) => {
      this.lobby();
    });
  }

  winResult() {
    this.container.replaceChildren();
    container.appendChild(templateEngine(winTemplate()));
    const goToGameButton = document.querySelector(".button-goToGame");
    goToGameButton.addEventListener("click", (event) => {
      this.gameMenu();
    });
    const goToLobbyButton = document.querySelector(".button-goToLobby");
    goToLobbyButton.addEventListener("click", (event) => {
      this.lobby();
    });
  }
}
