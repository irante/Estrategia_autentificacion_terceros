const PORT = 8080;
const HOST = "localhost";

const MONGO_USER = "irante";
const MONGO_PWD = "flame360";
const MONGO_DB = "ecommerce";
const MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@cluster0.8qme5x7.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;

const GITHUB_CLIENT_ID = "Iv1.6a5c69167a3ce209";
const GITHUB_CLIENT_SECRET = "1d7141712c8d53023ef2932f312fa1c44cdf4295";
const GITHUB_STRATEGY_NAME = "github";

module.exports = {                              // exporto un objeto con las variables globales
    MONGO_URL,
    PORT,
    HOST,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    GITHUB_STRATEGY_NAME,
};
