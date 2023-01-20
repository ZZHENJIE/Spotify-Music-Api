var express = require('express');
var router = express.Router();
const { Get_Token } = require('./Token');

router.get('/',async function(req, res, next) {

    var Token = await Get_Token();

    var id = null;

    if(req.query.id != null){
        id = req.query.id;
    }

    if(id != null && Token != null){
        fetch('https://api.spotify.com/v1/audio-analysis/' + id,{
            headers: {
                'Authorization':'Bearer ' + Token
            }
        })
        .then(response => response.json())
        .then(data => res.send(data));
    }else{
        if(id == null){
            res.send(JSON.stringify({"error":"未输入Id"}));
        }
        else{
            res.send(JSON.stringify({"error":"获取Token失败"}));
        }
    }   
});

module.exports = router;