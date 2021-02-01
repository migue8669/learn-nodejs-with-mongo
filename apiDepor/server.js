
var unirest = require("unirest");

var req = unirest("GET", "https://sanpau82-casas-de-apuestas-v1.p.rapidapi.com//api.casasdeapuestas.site/readme.v1.0.6");

req.headers({
	"x-rapidapi-host": "sanpau82-casas-de-apuestas-v1.p.rapidapi.com",
	"x-rapidapi-key": "8b214088fcmsh1fe438adc083776p1dd1ebjsn2ad13c4ccf3d",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});