var express = require('express');
var router = express.Router();
const { Get_Token } = require('./Token');

router.get('/',async function(req, res, next) {

    var Token = await Get_Token();

    var id = null;

    var limit = '10';

    var offset = '0';

    if(req.query.id != null){
        id = req.query.id;
    }

    if(req.query.limit != null){
        limit = req.query.limit;
    }

    if(req.query.offset != null){
        offset = req.query.offset;
    }
    
    if(id != null && Token != null){
        fetch('https://api.spotify.com/v1/albums/' + id + '/tracks?market=CH&limit=' + limit + '&offset=' + offset,{
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