var express = require('express');
var router = express.Router();
const { Get_Token } = require('./Token');

router.get('/',async function(req, res, next) {

    var Token = await Get_Token();

    var keyword = null;

    var type = 'track';

    var limit = '10';

    var offset = '0';

    if (req.query.keyword != null){
        keyword = req.query.keyword;
    }

    if (req.query.type != null){
        type = req.query.type;
    }

    if (req.query.limit != null){
        limit = req.query.limit;
    }

    if (req.query.offset != null){
        offset = req.query.offset;
    }

    if(keyword != null && Token != null){
        fetch('https://api.spotify.com/v1/search?q=' + keyword + '&type=' + type + '&market=CH&limit=' + limit + '&offset=' + offset,{
            headers: {
                'Authorization':'Bearer ' + Token
            }
        })
        .then(response => response.json())
        .then(data => res.send(data));
    }else{
        if(keyword == null){
            res.send(JSON.stringify({"error":"未输入关键词"}));
        }
        else{
            res.send(JSON.stringify({"error":"获取Token失败"}));
        }
    }   
});

module.exports = router;