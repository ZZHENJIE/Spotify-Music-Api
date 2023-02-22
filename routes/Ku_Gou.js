var express = require('express');
var router = express.Router();

router.get('/Search',function(req, res, next) {

    var offset = 1;
    var limit = 10;

    if(req.query.limit != null){
        limit = req.query.limit;
    }

    if(req.query.offset != null){
        offset = req.query.offset;
    }

    if(req.query.keyword != null){
        var keyword = req.query.keyword;

        var Url = 'http://mobilecdn.kugou.com/api/v3/search/song?keyword='+ keyword +'&page=' + offset + '&pagesize=' + limit;

        fetch(Url)
        .then(response => response.json())
        .then(data => res.send(data));
    }else{
        res.send({
            "Message":"未输入关键词"
        })
    }
});

router.get('/Song',function(req, res, next) {

    var Hash = 0;
    var Album_id = 0;
    var Album_audio_id = 0;

    if(req.query.hash != null){
        Hash = req.query.hash;
    }

    if(req.query.album_id != null){
        album_id = req.query.album_id;
    }

    if(req.query.album_audio_id != null){
        Album_audio_id = req.query.album_audio_id;
    }

    if(Hash != null && Album_id != null && Album_audio_id != null){
        var Url = 'https://wwwapi.kugou.com/yy/index.php?r=play/getdata&hash=' + Hash + '&album_id=' + album_id + '&album_audio_id=' + Album_audio_id;
        fetch(Url,{
            credentials: 'include',
            headers: {
                'Cookie': 'kg_mid=1'
            }
        })
        .then(response => response.json())
        .then(data => res.send(data));
        console.log(Url);
    }else{
        res.send({
            "Message":"未输入歌曲代码!"
        })
    }
});

module.exports = router;