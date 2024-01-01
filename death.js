const { cmd, getAdmin, tlang, sleep } = require("../lib/");
const eco = require('siraj-bank')

//=====================================================================
let deathGame = {};

cmd({
  pattern: "de",
  category: "games",
}, async (Void , m,text) => { // Use async (Void , m,text) => {
let id = m.chat.split("@")[0]


if(!deathGame || !deathGame[id]){
  deathGame[id] = {    
  join :true,
  start: false,
  joined: [],
  available :[],
  players: {},
  eliminatedPlayers: [],
  killer:"player",
  word :null,
  chosenWord: "",
  words: ['mama', 'baba', 'nana', 'gaga',"suhail","siraj","md","cute"], 
  }
}
//let durationInSeconds = 60; // Set the initial duration
deathGame[id].join = true
m.reply("game started, type 'Join' to enter in game")
startTimer(m,id, 20);



  /*
  if (!deathGame.isGameActive) {
    startDeathGame(citel);
  } else {

    if (!deathGame.players.includes(citel.sender)) {




      deathGame.players.push(citel.sender);
      const playerNumber = deathGame.players.length;
      citel.reply(`You've joined the Death game as Player ${playerNumber}.`);
      
      if (deathGame.players.length === 2) {
        chooseWordAndStart(citel);
      }
    } else if (!awaitingPlayerNumber) {
      citel.reply(`You've chosen the correct word! Choose a player number for elimination.`);
      awaitingPlayerNumber = true; 
    }
  }
  */
});



cmd({ on: "text" } , async (Void , citel,text) => {  // Use  async (Void , citel,text) => {
if(citel.isBot) return

  let id = citel.chat.split("@")[0] 
  let senderNum = citel.sender.split("@")[0];
// ============== / Joinening people in game


if(citel.text.toLowerCase() === "join" && deathGame[id] && deathGame[id].join &&  !deathGame[id].available.includes(citel.sender)){
  deathGame[id].joined.push(citel.sender)
  deathGame[id].available.push(citel.sender)
  deathGame[id].players[deathGame[id].joined.length] = citel.sender;
  return await citel.reply(`Player @${senderNum} Joined!\nYou'r number is *"${deathGame[id].joined.length}"*`,{mentions:[citel.sender]})
} 

if(!deathGame[id] || !deathGame[id].available.includes(citel.sender))return  
// ============== / first one wjho collect word 
if(deathGame[id] && deathGame[id].start && deathGame[id].word && deathGame[id].word === citel.text.toLowerCase()){
  deathGame[id].killer = citel.sender;
  deathGame[id].word= null

  let str = "ID:  PLAYER\n",mentios = [];
  for(let index in deathGame[id].players){
if(deathGame[id].players[index] !== citel.sender){
    mentios.push(deathGame[id].players[index])
  str += `${index} : @${deathGame[id].players[index].split("@")[0]}\n` 
}
  }
 await citel.reply(`Hey @${senderNum} you're now Killer!

${str.trim()} 

*Enter ID of player to eleminate from game!*
 `.trim(),{mentions:[citel.sender,...mentios]})
}

// ============== / action for killer 
else if(deathGame[id] && deathGame[id].start && deathGame[id].killer === citel.sender){
  let num = parseInt(text) || false
  if(num && !isNaN(num) && deathGame[id].players[num] && deathGame[id].players[num]!==citel.sender  ){
    await citel.reply(`Hey @${deathGame[id].players[num].split("@")[0]} you're Killed by @${senderNum}!`,
    {mentions:[citel.sender,deathGame[id].players[num]]})


    let playerIdToRemove = deathGame[id].players[num];
    if (deathGame[id].available.includes(playerIdToRemove)) {
      deathGame[id].available = deathGame[id].available.filter(playerId => playerId !== playerIdToRemove);
    }


    deathGame[id].eliminatedPlayers.push(deathGame[id].players[num])
    delete deathGame[id].players[num]

    sleep(5000)
 if(deathGame[id].available.length <=1 ){
  let ppp = [...deathGame[id].joined]
  delete deathGame[id]
  citel.reply(`Hurray @${citel.sender.split("@")[0]} you're the winner of Game!`,
  {mentions:[citel.sender,...ppp]})

}else {
  let randome = Math.floor(Math.random() * deathGame[id].words.length);
let word = deathGame[id].words[randome];
deathGame[id].word = word;
  citel.send(`Here's the another word :  *${word}* `,{mentions:[...deathGame[id].available]})


}

  }else {
    let str = "",mentios = [];
    for(let index in deathGame[id].players){
  if(deathGame[id].players[index] !== citel.sender){
      mentios.push(deathGame[id].players[index])
    str += `${index} : @${deathGame[id].players[index].split("@")[0]}\n` 
  }
    }

   citel.reply(`Hey @${senderNum}, please enter id of any following player to eleminate from game!
  
  ${str} `,{mentions:[citel.sender,...mentios]})
  }
 



}

})



















async function startTimer(m,id="suhail", durationInSeconds=3 , type = "join",pplyers = "1,2") {
  let timer = durationInSeconds || 30;
  let intervalId;
if(type == "join"){
  async function updateTimer() {
    if (timer > 0) {
      timer--;

  // Your existing code
  if (deathGame[id] && deathGame[id].join && (timer == 50  || timer == 15 || timer ==30 || timer == 5)) {
    m.reply(`There are ${deathGame[id].joined.length} joined\nStill have ${timer}s to join in the game!\nType _Join to enter the game_`);
  }


      //console.log(`Timer: ${timer}s`);
    } else {
      clearInterval(intervalId);
      if( deathGame[id].joined.length <= 0){
        delete deathGame[id];
        return await m.send(`*Death Game Terminated! There's no player joined in game!*`)
      }else if(deathGame[id].joined.length <= 1) {
        let pplayer = deathGame[id].joined[0]
        delete deathGame[id];
        return await m.send(`*Death Game Terminated! Hey @${pplayer.split("@")[0]}, player requirement not be fullfilled!*`,{mentions:[pplayer]})
      }




      deathGame[id].join=false
      deathGame[id].start= true

      let str = "",mentios = [];

      for(let index in deathGame[id].players){
        mentios.push(deathGame[id].players[index])
      str += `${index} : @${deathGame[id].players[index].split("@")[0]}\n` 
    //}
      }
   await m.send(`*LIST OF PLAYERS WHO JOINED GAME!*
  
${str} 
  
*TASK?:*
  Bot sends a randome word in chat!
  and player needs to copy and sent the word in chat at first!
  then he/she is a killer and able to eleminate a player from game!
  
*WINNER?:*
  player who stays till end of game is a winner!
  `,{mentions:[...mentios]})

  let randome = Math.floor(Math.random() * deathGame[id].words.length);

await sleep(5000)

let word = deathGame[id].words[randome];
deathGame[id].word = word;
  m.send(`Here's the word :  *${word}* `,{mentions:[...mentios]})




    }

   



  }
  intervalId = setInterval(updateTimer, 1000);
}else if (type == "killer"){ /// ignore this code or remove it, coz its unnecesory
  function setkiller() {
    if (timer > 0) {
      timer--;

  // Your existing code
  if (deathGame[id] && deathGame[id].join && (timer == 50  || timer == 15 || timer ==30 || timer == 5)) {
    m.reply(`There are ${deathGame[id].joined.length} joined\nStill have ${timer}s to join in the game!\nType _Join to enter the game_`);
  }



    } else {
      clearInterval(intervalId);
      deathGame[id].join=false
      deathGame[id].start= true
      m.reply("Timer reached 0. Do something here.");
    }
  }
  intervalId = setInterval(setkiller, 1000);

  
}



}
