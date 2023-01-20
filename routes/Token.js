exports.Get_Token = () =>{
    const { post } = require("request");

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

    var Token = new Promise ((resolve, reject) => {
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

    return Token;
}