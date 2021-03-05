const rpsLookup = {
  r: {
    imgUrl: "imgs/rock.png",
    beats: "s",
  },
  p: {
    imgUrl: "imgs/paper.png",
    beats: "r",
  },
  s: {
    imgUrl: "imgs/scissors.png",
    beats: "p",
  },
};


let scores, winner, results;

const scoreEls = {
  p: document.querySelector("#p-score"),
  t: document.querySelector("#t-score"),
  c: document.querySelector("#c-score"),
};

const resultEls = {
  p: document.querySelector("#p-result"),
  c: document.querySelector("#c-result"),
};

document.querySelector("main button").addEventListener("click", startCountdown);

function init() {
  scores = {
    p: 0,
    t: 0,
    c: 0,
  };
  // initial value for results will be both on rock
  results = {
    p: "r",
    c: "r",
  };
  winner = null; // 'p', 't', 'c'
  render();
}

init();

function render() {
  // first render scores using keys in scores object
  for (let score in scores) {
    scoreEls[score].textContent = scores[score];
  }
  // next render results using keys in results object
  for (let result in results) {
    resultEls[result].style.borderColor = winner === result ? "grey" : "white";
    resultEls[result].src = rpsLookup[results[result]].imgUrl;
  }
}

function getRandomRPS() {
  return ["r", "p", "s"][Math.floor(Math.random() * 3)];
}

function playRound() {
  // Determine results
  results.p = getRandomRPS();
  results.c = getRandomRPS();
  // Determine winner
  if (results.p === results.c) {
    winner = "t";
  } else if (results.c === rpsLookup[results.p].beats) {
    winner = "p";
  } else {
    winner = "c";
  }
  // Update score
  scores[winner]++;
  // After all impacted state has been updated, call render
  render();
}

function startCountdown() {
  let timeleft = 3;
  let downloadTimer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
      document.getElementById("countdown").textContent = "";
      playRound();
    } else {
      document.getElementById("countdown").textContent = timeleft;
    }
    timeleft -= 1;
  }, 1000);
}