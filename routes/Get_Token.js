var express = require('express');
var request = require('request');
var router = express.Router();

var Token = null;

function Get_Token(){
    var client_id = '8e4613e37b0246f79bd0a12532c44053';
    var client_secret = '1489aa466a714a29a6a36fc73a6147a1';

    var Get_Token_Url = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    };

    request.post(Get_Token_Url,function(error, response, body){
        if (!error && response.statusCode === 200) {
            Token = body.access_token;
        }
    });
}

router.get('/', function(req, res, next) {
    Get_Token();
    
    setTimeout(function(){
        if(Token == null){
            res.send(JSON.stringify({"error":"获取Token失败"}));
        }
        else{
            res.send(JSON.stringify({'Key':Token}));
        }
    },50);
});

module.exports = router;