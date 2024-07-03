const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUpYSGhQdzhPYlpHeVFETkpjaWl5dmlUQ3RSSjlBSjBTcldDWi9jaHNtUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid1lDM2h0c2R4azcyNlpFQm1uK0E3SG44TU42dmhBc3dzZFBOdmE3VjFRVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvQmNzVitLSFF6SnhWdFltUDAySWwzUlZYQmpMaCtKVW9zeEI5NHkybTBFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJiclBEQllxNExWWUFadmczUUVIcWEzcHUzL3BDWUcrOEJmVmZWTDU0RWhrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRITW5KbXk4bU01MktJUWRLakpGNWowNzhaQWZzSG80aXlTeTJTNTM0VlE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImQ0a0RXTnZNRndHOFpBek5CQWFWTC9JRXEvM0R4NXFLaDdEbjRZbjZBaEk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWU5ST282MFZlS21obHdjSXRHNXI1U0JHZnZja2R4cTA2UXRUN3ZRL2lFOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY3F6TDJyWEFtY3E0QnlFUjY2R2VVVWQ3Zml3b05ra1F6NVdEaStQZ3l3QT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZ4M1BKSU1MeGxxL1RnMjlPeUhQYk8wUnN5RGozYWJBUy9zckpBSzh0TFh2NnZ2dlM2T2pTNUhpVUxxb2hwWGJkY1RTQzNxUmVyejhpRHpBVDU5Tmh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjMwLCJhZHZTZWNyZXRLZXkiOiJkamQvT1FQRTJkTUEzOUVMK2JyR21DUTlBOFpEazdFNWUxaWNkY29oSk5ZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkyMzcwODA1NzE0MEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI0QTM3OEE0NkVEMDcyRUZENkVBMDJDQjI5OThCRDAxNyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzE5OTc1MzQ2fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MjM3MDgwNTcxNDBAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNkQzOTAyQjUyN0NFNEI4N0UyOENCOTcwQzI5NjFFOTMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcxOTk3NTM0Nn0seyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzNzA4MDU3MTQwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkVBNzc4RUJBOUY5OTIwNkQxOTY4QUI3RUM5RTU0MzEyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTk5NzUzNDl9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlhMclZCUGtkUUlTSlVjNmlFQVdsM2ciLCJwaG9uZUlkIjoiODBlM2NiYjgtODllYS00NzAyLTkzZWUtZjEzYzUxMmU5NTgwIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRuN1U5aTJrbDlGejBTNmFHVmpBT1FnQlJORT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzTWtteXpheUMvMFovYmNyWjRWZklickFTdk09In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNVNaS1RSWUciLCJtZSI6eyJpZCI6IjkyMzcwODA1NzE0MDo1QHMud2hhdHNhcHAubmV0IiwibmFtZSI6Ikl0eCBtZSBiYXNpdCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTjdtdGRVSEVLUDdrclFHR0FVZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoialg5cWgvL1NrT3c0ai9vd3ZZTDhuWUJrbmc5Um9mZHRkNGFjSzBKM0xUZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiUjJsTXJXYysyUS95MmRsSnNXNjlmWGFxZFZsSTlSczg3ZG91N3djWGtCUUhwVUFSNFBIU2tkNExwem45bU82cnp2cE9rL2RBc2tPMGMxRzM1OVJDQXc9PSIsImRldmljZVNpZ25hdHVyZSI6Ik5RYXhSQmJPYnRVM0NjK0Izdk9NMkFNVmdVbjc2VjRFb0Z0Yjg1dDU2aUFWVkRBc0FqVEFZRlhKUWNwVGttbGM4a2lrcllRWTROdHloZ0ppa1J2amhnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzNzA4MDU3MTQwOjVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWTEvYW9mLzBwRHNPSS82TUwyQy9KMkFaSjRQVWFIM2JYZUduQ3RDZHkwNCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxOTk3NTM0NCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFQNksifQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BMW_XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/fd124f7e9271111c3bcc1.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
