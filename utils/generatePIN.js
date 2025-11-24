const fs = require('fs/promises');
const path = require('path');

async function generatePIN() {
    const PINCandidate = `${Math.floor(Math.random() * 9999)}`.padStart(4, '0');
    try{
        await fs.access(path.join(__dirname, '..', 'data'));
        if (!(await checkPINExists(PINCandidate))){
            const passwords = JSON.parse(await fs.readFile(path.join(__dirname, '..', 'data', 'passwords.json'), {encoding: 'utf8'}));
            passwords.push(PINCandidate);
            await fs.writeFile(path.join(__dirname, '..', 'data', 'passwords.json'), JSON.stringify(passwords), {encoding: 'utf8'});
            return PINCandidate;
        }
    }catch(error){
        console.error(error.message)
        await fs.mkdir(path.join(__dirname, '..', 'data'));
        await fs.writeFile(path.join(__dirname, '..', 'data', 'passwords.json'), JSON.stringify([PINCandidate]), {encoding: 'utf8'});
        return PINCandidate;
    }

    return await generatePIN();
}

async function checkPINExists(pin) {
    const passwords = JSON.parse(await fs.readFile(path.join(__dirname, '..', 'data', 'passwords.json'), {encoding: "utf8"}));
    return passwords.includes(pin);
}

module.exports = {generatePIN, checkPINExists}
