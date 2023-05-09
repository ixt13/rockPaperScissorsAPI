function loginTemplate() {
  return {
    tag: "div",
    cls: "formContainer",
    content: [
      {
        tag: "img",
        cls: "topImage",
        attrs: { src: "./data/Mask group.svg", width: "100%" },
      },
      { tag: "div", cls: "inputText" },
      {
        tag: "form",
        cls: "inputForm",
        content: [
          { tag: "h1", content: "Камень, ножницы, бумага" },
          { tag: "h3", cls: "loginText", content: "Никнейм" },
          { tag: "input", cls: "loginInput" },
          { tag: "button", cls: "loginButton", content: "Войти" },
        ],
      },
    ],
  };
}

function lobbyTemplate() {
  return {
    tag: "div",
    content: [
      { tag: "div", cls: "topBorder" },
      {
        tag: "div",
        cls: "lobbySection",
        content: [
          { tag: "h2", cls: "lobbyText", content: "Лобби" },
          { tag: "div", cls: "lobbyPlayerList" },
          { tag: "button", cls: "playButton", content: "Играть" },
        ],
      },
    ],
  };
}

function waitTemplate() {
  return {
    tag: "div",
    content: [
      { tag: "div", cls: "topBorder" },
      { tag: "h1", cls: "gameText", content: "Игра" },
      {
        tag: "div",
        cls: "waiter",
        content: [
          {
            tag: "img",
            attrs: { src: "./data/Group 1077239872.png", width: "100px" },
          },
          { tag: "h3", content: "Ожидаем подключение соперника..." },
        ],
      },
    ],
  };
}

function gameTemplate() {
  return {
    tag: "div",
    content: [
      { tag: "div", cls: "topBorder" },
      { tag: "h1", cls: "gameText", content: "Игра" },
      { tag: "h3", cls: "p", content: `Вы против ${enemyNickName}` },
      {
        tag: "div",
        cls: "movesBox",
        content: [
          {
            tag: "div",
            cls: "moveSection",
            content: [
              {
                tag: "img",
                cls: "img",
                attrs: { src: "./data/Group 1077239871.png", width: "95px" },
              },
              {
                tag: "button",
                cls: ["stoneButton", "moveButtons"],
                content: "Камень",
              },
            ],
          },

          {
            tag: "div",
            cls: "moveSection",
            content: [
              {
                tag: "img",
                cls: "img",
                attrs: { src: "./data/Group 1077239870.png", width: "95px" },
              },
              {
                tag: "button",
                cls: ["scissorButton", "moveButtons"],
                content: "Ножницы",
              },
            ],
          },

          {
            tag: "div",
            cls: "moveSection",
            content: [
              {
                tag: "img",
                cls: "img",
                attrs: { src: "./data/Group 1077239869.png", width: "95px" },
              },
              {
                tag: "button",
                cls: ["paperButton", "moveButtons"],
                content: "Бумага",
              },
            ],
          },
        ],
      },
    ],
  };
}

function waitMoveTemplate() {
  return {
    tag: "div",
    content: [
      { tag: "div", cls: "topBorder" },
      { tag: "h1", cls: "gameText", content: "Игра" },
      { tag: "h3", cls: "p", content: `Вы против ${enemyNickName}` },
      {
        tag: "div",
        cls: "waiter",
        content: [
          {
            tag: "img",
            attrs: { src: "./data/Group 1077239872.png", width: "100px" },
          },
          { tag: "h3", content: "Ожидаем ход соперника..." },
        ],
      },
    ],
  };
}

function loseTemplate() {
  return {
    tag: "div",
    content: [
      { tag: "div", cls: "topBorder" },
      { tag: "h1", cls: "gameText", content: "Игра" },
      { tag: "h3", cls: "p", content: `Вы против ${enemyNickName}` },
      {
        tag: "div",
        cls: "gameResultContent",
        content: [
          {
            tag: "img",
            cls: "resultImg",
            attrs: { src: "./data/Group 1077239874.png", width: "155px" },
          },
          { tag: "h1", content: "Вы проиграли!" },
        ],
      },
      {
        tag: "div",
        cls: "buttons",
        content: [
          {
            tag: "button",
            cls: ["playButton", "button-goToGame"],
            content: "Играть еще",
          },
          {
            tag: "button",
            cls: ["playButton", "button-goToLobby"],
            content: "В лобби",
          },
        ],
      },
    ],
  };
}

function winTemplate() {
  return {
    tag: "div",
    content: [
      { tag: "div", cls: "topBorder" },
      { tag: "h1", cls: "gameText", content: "Игра" },
      { tag: "h3", cls: "p", content: `Вы против ${enemyNickName}` },
      {
        tag: "div",
        cls: "gameResultContent",
        content: [
          {
            tag: "img",
            cls: "resultImg",
            attrs: { src: "./data/Group 1.png", width: "155px" },
          },
          { tag: "h1", content: "Вы выиграли!!" },
        ],
      },
      {
        tag: "div",
        cls: "buttons",
        content: [
          {
            tag: "button",
            cls: ["playButton", "button-goToGame"],
            content: "Играть еще",
          },
          {
            tag: "button",
            cls: ["playButton", "button-goToLobby"],
            content: "В лобби",
          },
        ],
      },
    ],
  };
}
