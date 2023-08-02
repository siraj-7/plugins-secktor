
const { cmd, tlang} = require('../lib')

    //---------------------------------------------------------------------------

    cmd(
        {
            pattern: "calc",
            filename: __filename
        },
        async (Void, citel, text) => {
            if (!text) {
                return citel.reply("Please enter a mathematical operation.");
            }
            text = text.replace(/\s+/g, '');
            if (!/^(\d+([-+*/]\d+)+)$/.test(text)) {
                return citel.reply("Please enter a valid mathematical operation.");
            }
            const evaluate = (exp) => {
                return new Function('return ' + exp)();
            };
            try {
                const result = evaluate(text);
                if (text.includes('/') && text.split('/').some((num) => num === '0')) {
                    return citel.reply("Cannot divide by zero.");
                  }
                if (text.split(/[-+*/]/).length <= 2) {
                    const [num1, operator, num2] = text.match(/\d+|[-+*/]/g);
                    return citel.reply(`${num1} ${operator} ${num2} = ${result}`);
                } else {
                    return citel.reply(`Result: ${result}`);
                }
            } catch (error) {
                return citel.reply("Error");
            }
        }
    )

    //---------------------------------------------------------------------------
