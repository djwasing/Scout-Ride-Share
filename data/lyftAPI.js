
var tokenGenerate = {
    setHeaders: {
        'Content-Type': 'application.json',
    },
    url: 'https://api.lyft.com/oauth/token'
};

// curl -X POST -H "Content-Type: application/json" \
//      --user "<client_id>:<client_secret>" \
//      -d '{"grant_type": "client_credentials", "scope": "public"}' \
     

var callLyft = {

}

module.exports = tokenGenerate;