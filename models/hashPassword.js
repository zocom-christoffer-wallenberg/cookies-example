const bcrypt = require('bcrypt');
const saltRounds = 10; //Hur många gångar som lösenordet kommer att hashas

module.exports = {
    //hash funktion som tar lösenordet som parameter och returnerar en hash
    async hashPassword(passwordToHash) {
        return await bcrypt.hash(passwordToHash, saltRounds);
    },

    async matchPassword(userPassword, hash) {
        const match = await bcrypt.compare(userPassword, hash);
        return match;
    }
}

/*Ni kan använda denna kod för att testa hur det fungerar att genera en hash och sedan jämföra lösenordet.
Ta bort kommentarerna och kör getPass();
async function getPass() {
    const myPlaintextPassword = 'pwd123';
    console.log(myPlaintextPassword);
    const hash = await hashPassword(myPlaintextPassword);
    console.log('Hash: ', hash);
    const match = await matchPassword(myPlaintextPassword, hash);
    console.log('Password match: ', match);
}

getPass()*/