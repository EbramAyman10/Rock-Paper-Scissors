 let score = JSON.parse(localStorage.getItem("score")) || {
        wins: 0,
        losses: 0,
        ties: 0,
      };

      updateScoreElement();
      function updateComputerMove() {
        if (ComputerMove === "rock") {
          ComputerMove = "&#9994";
        } else if (ComputerMove === "paper") {
          ComputerMove = "&#9995";
        } else if (ComputerMove === "scissors") {
          ComputerMove = "&#9996";
        }
      }

      
      document.querySelector('.js-auto-btn').addEventListener('click' , () => {
        autoplay();
      })

      
      let isAutoPlaying = false;
      let intervalId;
      function autoplay()
      {
        if(!isAutoPlaying)
        {
          intervalId = setInterval(() => {
           const playerMove = pickComputerMove();
           playGame(playerMove);
          }, 1000) 
          isAutoPlaying=true;
          document.querySelector('.js-auto-btn').innerHTML = 'Stop AutoPlay'
        }
        else{
          clearInterval(intervalId);
          isAutoPlaying= false;
           document.querySelector('.js-auto-btn').innerHTML = 'AutoPlay'
        }
      }


      const rockButton = document.querySelector('.js-rock-button');

      rockButton.addEventListener('click', () => {
        playGame('rock');
      })

      const paperButton = document.querySelector('.js-paper-button');
      
      paperButton.addEventListener('click' , () => {
        playGame('paper');
      })

      const scissorButton = document.querySelector('.js-scissors-button');
      
      scissorButton.addEventListener('click' , () => {
        playGame('scissors');
      })


      document.body.addEventListener('keydown', (event) => {
        if(event.key === 'r')
        {
          playGame('rock');
        }
        else if(event.key === 'p')
        {
          playGame('paper');
        }
        else if(event.key === 's')
        {
          playGame('scissors');
        }
        else if(event.key==='a')
        {
          autoplay();
        }
        else if(event.key==='Backspace')
        {
          score.win=0;
          score.lose=0;
          score.tie=0;
          localStorage.removeItem('score');
          updateScoreElement();
        }
      })

   document.querySelector('.js-reset-btn').addEventListener('click', ()=> {
    document.querySelector('.js-confirm-msg').innerHTML = `Are you  sure you want to reset the score? <button class='js-yes'>Yes</button> <button class='js-no'>No</button>`
    document.querySelector('.js-yes').addEventListener('click',()=>{
    score.win=0;
    score.lose=0;
    score.tie=0;
    localStorage.removeItem('score');
    updateScoreElement();
    document.querySelector('.js-confirm-msg').innerHTML = ``;
    })
    document.querySelector('.js-no').addEventListener('click',()=>{
    document.querySelector('.js-confirm-msg').innerHTML = ``;
      })
    });

      function playGame(playerMove) {
        const ComputerMove = pickComputerMove();
        if (playerMove === "scissors") {
          playerMove = "&#9996";
          if (ComputerMove === "&#9994") {
            result = "lose";
          } else if (ComputerMove === "&#9995") {
            result = "win";
          } else if (ComputerMove === "&#9996") {
            result = "tie";
          }
        } else if (playerMove === "rock") {
          playerMove = "&#9994";
          if (ComputerMove === "&#9994") {
            result = "tie";
          } else if (ComputerMove === "&#9995") {
            result = "lose";
          } else if (ComputerMove === "&#9996") {
            result = "win";
          }
        } else if (playerMove === "paper") {
          playerMove = "&#9995";
          if (ComputerMove === "&#9994") {
            result = "win";
          } else if (ComputerMove === "&#9995") {
            result = "tie";
          } else if (ComputerMove === "&#9996") {
            result = "lose";
          }
        }

        if (result === "win") {
          score.win += 1;
        } else if (result === "lose") {
          score.lose += 1;
        } else if (result === "tie") {
          score.tie += 1;
        }

        localStorage.setItem("score", JSON.stringify(score));
        updateScoreElement();
        document.querySelector(".js-result").innerHTML = `You ${result}`;
        document.querySelector(
          ".js-moves"
        ).innerHTML = `You ${playerMove} ${ComputerMove}  Computer.`;
      }
      function updateScoreElement() {
        document.querySelector(
          ".js-score"
        ).innerHTML = `Wins: ${score.win} , Losses: ${score.lose} , Ties: ${score.tie}`;
      }
      function pickComputerMove() {
        let ComputerMove = "";
        const randomNumber = Math.random();
        if (randomNumber >= 0 && randomNumber < 1 / 3) {
          ComputerMove = "&#9994";
        } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
          ComputerMove = "&#9995";
        } else if (randomNumber >= 2 / 3 && randomNumber <= 1) {
          ComputerMove = "&#9996";
        }
        console.log(ComputerMove);
        return ComputerMove;
      }
