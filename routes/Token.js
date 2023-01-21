const { post } = require("request");
    
/*
把这的 client_id client_secret 设置为Spotify developer 中的 client_id client_secret
*/

var client_id = '8e4613e37b0246f79bd0a12532c44053';
var client_secret = '1489aa466a714a29a6a36fc73a6147a1';

exports.Get_Token = () =>{

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

    var Token = new Object({
        error: "获取数据失败"
    });

    if(client_id != null && client_secret!= null){
        Token = new Promise ((resolve, reject) => {
            post(Get_Token_Url,(error, response, body) => {
                if (!error && response.statusCode === 200){
                    resolve(body.access_token);
                }else{
                    resolve({
                        error: "获取数据失败"
                    });
                }
            })
        })
    }

    return Token;
}

exports.Set_Data = (id,secret) =>{
    client_id = id;
    client_secret = secret;
}

exports.Get_Data = () =>{
    return {
        "client_id": client_id,
        "client_secret": client_secret
    }
}