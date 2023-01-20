var express = require('express');
var router = express.Router();
const { Get_Token } = require('./Token');

router.get('/',async function(req, res, next) {
    var Token = await Get_Token();

    if(Token.error != null) {
        res.send(Token);
    }else{
        res.send({
            Key: Token
        });
    }
});

module.exports = router;