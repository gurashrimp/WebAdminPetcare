const tokenService = require("./service");
exports.getTokens = async () => {
    try {
        let tokens = await tokenService.getAll();
        tokens = tokens.map((item) => {
            item = {
                fcm_tokens: item.fcm_tokens
            }
            return item;
        })
        return tokens;
    } catch (error) {
        console.log(error)
        return false;
    }
}

