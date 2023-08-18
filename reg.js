const { sck, sck1,cmd, Config, sleep,getAdmin } = require('../lib')

cmd({
    pattern: "un",
},
async (Void, citel) => {

    const user = await sck1.findOne({ id: citel.sender });

    if (user) {
        await sck1.deleteOne({ id: citel.sender });
        return citel.reply("Your registration has been deleted.");
    } else {
        return citel.reply("You are not registered.");
    }
});



cmd({
    pattern: "fofi",
},
async (Void, citel) => {
    const user = await sck1.findOne({ id: citel.sender });

    if (user) {
        return citel.reply(`Your registered name is: ${user.name}`);
    } else {
        return citel.reply("You are not registered.");
    }
});



cmd({
    pattern: "reg",
},
async (Void, citel, text) => {
    const username = text.trim();
    const existingUser = await sck1.findOne({ id: citel.sender });

    if (existingUser) {
        await sck1.deleteOne({ id: citel.sender });
    }
    const newUser = new sck1({
        id: citel.sender,
        name: username,
        bot: false, // Assuming the user is not a bot
    });

    try {
        await newUser.save();
        return citel.reply(`Welcome, ${username}! You have been registered.`);
    } catch (error) {
        console.error(error);
        return citel.reply("An error occurred while registering. Please try again later.");
    }
});
