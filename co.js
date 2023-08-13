const { sck, cmd } = require('../lib')
const countries = {
  "Afghanistan": "Kabul",
  "Albania": "Tirana",
  "Algeria": "Algiers",
  "Andorra": "Andorra",
  "Angola": "Luanda",
  "Argentina": "Buenos Aires",
  "Armenia": "Yerevan",
  "Australia": "Canberra",
  "Austria": "Vienna",
  "Azerbaijan": "Baku",
  "Bahamas": "Nassau",
  "Bahrain": "Manama",
  "Bangladesh": "Dhaka",
  "Barbados": "Bridgetown",
  "Belarus": "Minsk",
  "Belgium": "Brussels",
  "Belize": "Belmopan",
  "Benin": "Porto-Novo",
  "Bhutan": "Thimphu",
  "Bolivia": "Sucre",
  "Bosnia and Herzegovina": "Sarajevo",
  "Botswana": "Gaborone",
  "Brazil": "Brasília",
  "Brunei": "Bandar Seri Begawan",
  "Bulgaria": "Sofia",
  "Burkina Faso": "Ouagadougou",
  "Burundi": "Gitega",
  "Cabo Verde": "Praia",
  "Cambodia": "Phnom Penh",
  "Cameroon": "Yaoundé",
  "Canada": "Ottawa",
  "Central African Republic": "Bangui",
  "Chad": "N'Djamena",
  "Chile": "Santiago",
  "China": "Beijing",
  "Colombia": "Bogotá",
  "Comoros": "Moroni",
  "Congo, Democratic Republic of the": "Kinshasa",
  "Congo, Republic of the": "Brazzaville",
  "Costa Rica": "San José",
  "Cote d'Ivoire": "Yamoussoukro",
  "Croatia": "Zagreb",
  "Cuba": "Havana",
  "Cyprus": "Nicosia",
  "Czech Republic": "Prague",
  "Denmark": "Copenhagen",
  "Djibouti": "Djibouti",
  "Dominica": "Roseau",
  "Dominican Republic": "Santo Domingo",
  "Ecuador": "Quito",
  "Egypt": "Cairo",
  "El Salvador": "San Salvador",
  "Equatorial Guinea": "Malabo",
  "Eritrea": "Asmara",
  "Estonia": "Tallinn",
  "Eswatini": "Mbabane",
  "Ethiopia": "Addis Ababa",
  "Fiji": "Suva",
  "Finland": "Helsinki",
  "France": "Paris",
  "Gabon": "Libreville",
  "Gambia": "Banjul",
  "Georgia": "Tbilisi",
  "Germany": "Berlin",
  "Ghana": "Accra",
  "Greece": "Athens",
  "Guatemala": "Guatemala City",
  "Guinea": "Conakry",
  "Guinea-Bissau": "Bissau",
  "Guyana": "Georgetown",
  "Haiti": "Port-au-Prince",
  "Honduras": "Tegucigalpa",
  "Hungary": "Budapest",
  "Iceland": "Reykjavik",
  "India": "New Delhi",
  "Indonesia": "Jakarta",
  "Iran": "Tehran",
  "Iraq": "Baghdad",
  "Ireland": "Dublin",
  "Israel": "Jerusalem",
  "Italy": "Rome",
  "Jamaica": "Kingston",
  "Japan": "Tokyo",
  "Jordan": "Amman",
  "Kazakhstan": "Nur Sultan",
  "Kenya": "Nairobi",
  "Kiribati": "Tarawa",
  "Korea, North": "Pyongyang",
  "Korea, South": "Seoul",
  "Kosovo": "Pristina",
  "Kuwait": "Kuwait City",
  "Kyrgyzstan": "Bishkek",
  "Laos": "Vientiane",
  "Latvia": "Riga",
  "Lebanon": "Beirut",
  "Lesotho": "Maseru",
  "Liberia": "Monrovia",
  "Libya": "Tripoli",
  "Liechtenstein": "Vaduz",
  "Lithuania": "Vilnius",
  "Luxembourg": "Luxembourg City",
  "Madagascar": "Antananarivo",
  "Malawi": "Lilongwe",
  "Malaysia": "Kuala Lumpur",
  "Maldives": "Male",
  "Mali": "Bamako",
  "Malta": "Valletta",
  "Marshall Islands": "Majuro",
  "Mauritania": "Nouakchott",
  "Mauritius": "Port Louis",
  "Mexico": "Mexico City",
  "Micronesia": "Palikir",
  "Moldova": "Chisinau",
  "Monaco": "Monaco",
  "Mongolia": "Ulaanbaatar",
  "Montenegro": "Podgorica",
  "Morocco": "Rabat",
  "Mozambique": "Maputo",
  "Myanmar": "Naypyidaw",
  "Namibia": "Windhoek",
  "Nauru": "Yaren",
  "Nepal": "Kathmandu",
  "Netherlands": "Amsterdam",
  "New Zealand": "Wellington",
  "Nicaragua": "Managua",
  "Niger": "Niamey",
  "Nigeria": "Abuja",
  "North Macedonia": "Skopje",
  "Norway": "Oslo",
  "Oman": "Muscat",
  "Pakistan": "Islamabad",
  "Palau": "Ngerulmud",
  "Palestine": "Ramallah",
  "Panama": "Panama City",
  "Paraguay": "Asunción",
  "Peru": "Lima",
  "Philippines": "Manila",
  "Poland": "Warsaw",
  "Portugal": "Lisbon",
  "Qatar": "Doha",
  "Romania": "Bucharest",
  "Russia": "Moscow",
  "Rwanda": "Kigali",
  "Saint Kitts": "Basseterre",
  "Saint Lucia": "Castries",
  "Samoa": "Apia",
  "San Marino": "San Marino",
  "Saudi Arabia": "Riyadh",
  "Senegal": "Dakar",
  "Serbia": "Belgrade",
  "Seychelles": "Victoria",
  "Sierra Leone": "Freetown",
  "Singapore": "Singapore",
  "Slovakia": "Bratislava",
  "Slovenia": "Ljubljana",
  "Solomon Islands": "Honiara",
  "Somalia": "Mogadishu",
  "South Africa": "Pretoria",
  "South Sudan": "Juba",
  "Spain": "Madrid",
  "Sri Lanka": "Colombo",
  "Sudan": "Khartoum",
  "Suriname": "Paramaribo",
  "Sweden": "Stockholm",
  "Switzerland": "Bern",
  "Syria": "Damascus",
  "Taiwan": "Taipei",
  "Tajikistan": "Dushanbe",
  "Tanzania": "Dodoma",
  "Thailand": "Bangkok",
  "Timor-Leste": "Dili",
  "Togo": "Lome",
  "Tonga": "Nuku'alofa",
  "Trinidad and Tobago": "Port of Spain",
  "Tunisia": "Tunis",
  "Turkey": "Ankara",
  "Turkmenistan": "Ashgabat",
  "Tuvalu": "Funafuti",
  "Uganda": "Kampala",
  "Ukraine": "Kyiv",
  "United Arab Emirates": "Abu Dhabi",
  "United Kingdom": "London",
  "United States": "Washington",
  "Uruguay": "Montevideo",
  "Uzbekistan": "Tashkent",
  "Vanuatu": "Port Vila",
  "Vatican": "Vatican City",
  "Venezuela": "Caracas",
  "Vietnam": "Hanoi",
  "Yemen": "Sana'a",
  "Zambia": "Lusaka",
  "Zimbabwe": "Harare"
};
const eco = require('discord-mongoose-economy');
const ty = eco.connect(mongodb);

const captions = {
  waitTime: 15,
  winReward: 2000,
  onStart: "*Capital Finding Game Started*\n*Player: *@$player_\n*Task:* _Tell the Capital of *$country*_\n\n_Your Time Starts Now, You Have $waitTime seconds to Answer_",
  onTimeOut: "*Game Over, run out of time*\n\n*Player:* _@$player_\n*Reason:* _TimeOut!, You're not responded_\n\n*Answer:*\n The Capital of *$country* is *$capital*",
  onLimitEnd: "*Game Over, Attempts limit Exceeded*\n\n*Player:* _@$player_\n*Reason:* _Not responded with the right answer in 3 attempts_\n\n*Answer:*\n The Capital of *$country* is *$capital*",
  onWrongAns: "*_Uhh dear, Your answer is not correct_*\n\n*Player:* _@$player_\n_You have $attempt more attempt!_\n\n*You have $waitTime seconds to answer!*",
  onWinGame: "*_Waoww, Your Answer is Correct_*\n*Player:* _@$player_\n\n_Capital of *$country* is *$capital*._\n_You gave the right answer in *$attempt attempt*_\n_$amount cash added in your wallet_"
};

let suhail_md_Capital = {
  id: '',
  player: '',
  country: '',
  capital: '',
  attempts: 0,
  waitTime: 20,
  preAns: 'previousAnswer',
  timer: ''
};

async function timerFunctions(msg, user, data) {
  await msg.sendMessage(user.chat, {
    text: captions.onTimeOut.replace('$player', data.player.split('@')[0]).replace('$country', data.country).replace('$capital', data.capital),
    mentions: [data.player]
  });
  delete suhail_md_Capital[user.sender];
  return;
}

cmd({
  pattern: 'ca',
  desc: 'Capital Finding Game',
  category: 'game',
  filename: __filename
}, async (message, match, group) => {
  const countriesKeys = Object.keys(countries);
  let randomCountry = countriesKeys[Math.floor(Math.random() * countriesKeys.length)];
  let randomCapital = countries[randomCountry];
  console.log('capital :', randomCapital);
  
  let gameData = suhail_md_Capital[match.sender];
  if (!gameData) {
    suhail_md_Capital[match.sender] = {
      id: match.chat,
      player: match.sender,
      country: randomCountry,
      capital: randomCapital,
      attempts: 0,
      waitTime: captions.waitTime,
      preAns: match.text,
      timer: ''
    };
  }

  let userGameData = suhail_md_Capital[match.sender];
  await message.sendMessage(match.chat, {
    text: captions.onStart
      .replace('$player', userGameData.player.split('@')[0])
      .replace('$country', userGameData.country)
      .replace('$waitTime', userGameData.waitTime),
    mentions: [userGameData.player]
  });

  userGameData.timer = setTimeout(() => {
    timerFunctions(message, match, userGameData);
  }, userGameData.waitTime * 1000);
});

cmd({
  on: 'text'
}, async (message, match, group) => {
  const gameData = suhail_md_Capital[match.sender];

  if (!gameData) return;

  if (gameData.id === match.chat && gameData.player === match.sender && gameData.preAns !== match.text && !match.isBaileys) {
    gameData.attempts += 1;
    clearTimeout(gameData.timer);
    gameData.preAns = match.text;

    if (match.text.toLowerCase() === gameData.capital.toLowerCase()) {
      await message.sendMessage(match.chat, {
        text: captions.onWinGame
          .replace('$player', gameData.player.split('@')[0])
          .replace('$country', gameData.country)
          .replace('$capital', gameData.capital)
          .replace('$amount', captions.winReward)
          .replace('$attempt', gameData.attempts),
        mentions: [gameData.player]
      });
      delete suhail_md_Capital[match.sender];
    } else {
      if (gameData.attempts < 3) {
        await message.sendMessage(match.chat, {
          text: captions.onWrongAns
            .replace('$player', gameData.player.split('@')[0])
            .replace('$attempt', `${3 - gameData.attempts}`)
            .replace('$waitTime', gameData.waitTime),
          mentions: [gameData.player]
        });
        gameData.timer = setTimeout(() => {
          timerFunctions(message, match, gameData);
        }, gameData.waitTime * 1000);
      } else {
        await message.sendMessage(match.chat, {
          text: captions.onLimitEnd
            .replace('$player', gameData.player.split('@')[0])
            .replace('$country', gameData.country)
            .replace('$capital', gameData.capital),
          mentions: [gameData.player]
        });
        delete suhail_md_Capital[match.sender];
      }
    }
  }
});



// Define the `eco.updateUser` function

