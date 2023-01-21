var express = require('express');
const { Set_Data,Get_Data } = require('./Token');
var router = express.Router();

router.get('/Get',function(req, res, next) {
    res.send(Get_Data())
});

router.get('/Set',function(req, res, next) {
    if (req.query.id != null && req.query.secret != null){
        Set_Data(req.query.id,req.query.secret);

        res.send({
            "Message":"成功"
        })
    }else{
        res.send({
            "error":"未输入ID或Secret"
        })
    }
});

module.exports = router;