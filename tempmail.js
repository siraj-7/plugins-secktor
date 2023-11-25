const { cmd } = require('../lib');
const axios = require('axios');
const fetch = require('node-fetch');
const { convert } = require('html-to-text'); // suhal i use this pack coz textBody	not working so he send an html msg

const secmailData = {};

cmd({
  pattern: "toto",
}, async (Void, citel) => {
  try {
    const eml = await random_mail();
    const info = eml[0].split('@');
    secmailData[citel.sender] = {
      email: eml[0],
      login: info[0],
      domain: info[1],
    };
    await citel.reply(
      `*EMAIL:*\n${eml[0]}\n\n*Login:*\n${info[0]}\n\n*Domain:*\n${info[1]}\n\n` +
      `_Type *secmail message* to check your inbox_`
    );
  } catch (e) {
    await citel.reply("An error occurred while generating the temporary email address.");
  }
});

cmd({
  pattern: "toch",
}, async (Void, citel) => {
  const user = citel.sender;
  const data = secmailData[user];

  if (!data) {
    await citel.reply("You haven't created a temporary email address. Use *secmail create* first.");
    return;
  }

  try {
    const eml = await get_mails(data.login, data.domain);
    if (eml.length === 0) {
      await citel.reply("*EMPTY*" + "\n\n_Type *secmail delete* to delete your email_");
      return;
    }

    for (const email of eml) {
      const emailContent = await fetchEmailContent(data.login, data.domain, email.id);
      if (emailContent) {
        const message = `*EMAIL [${email.id}]*\n*From*: ${email.from}\n*Subject*: ${email.subject}\n*Date*: ${email.date}\n*Content*: ${emailContent}`;
        await citel.reply(message);
      }
    }
  } catch (e) {
    await citel.reply("An error occurred while checking the temporary email inbox.");
  }
});

cmd({
  pattern: "tode",
}, async (Void, citel) => {
  const user = citel.sender;
  if (secmailData[user]) {
    delete secmailData[user];
    await citel.reply("Successfully deleted the email address.");
  } else {
    await citel.reply("No email address to delete.");
  }
});

async function random_mail() {
  const link = "https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1";
  try {
    let response = await fetch(link);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function get_mails(id, domain) {
  const link = `https://www.1secmail.com/api/v1/?action=getMessages&login=${id}&domain=${domain}`;
  try {
    let response = await fetch(link);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function fetchEmailContent(id, domain, messageId) {
  const link = `https://www.1secmail.com/api/v1/?action=readMessage&login=${id}&domain=${domain}&id=${messageId}`;
  try {
    let response = await fetch(link);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    const htmlContent = data.htmlBody;
    const options = {
      wordwrap: 130,
    };
    const plainTextContent = convert(htmlContent, options);
    return plainTextContent;
  } catch (error) {
    console.log(error);
    return null;
  }
}

