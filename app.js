const express = require("express");
const fs = require("fs");

var app = express();
var template = fs.readFileSync("home.html", "utf-8");
var list = fs.readdirSync("./music");

app.set('port', (process.env.PORT || 5000));
app.use("/", express.static(__dirname));

function replace(str, tag, value) {
	return str.replace(`[${tag}]`, value);
}

app.get("/", (req,res) => {
	
	var response = template;

	var rand = Math.random()*(list.length-1);

	var argv = list[Math.round(rand)].split(".");

	response = replace(response,"songdetails",argv[0]);
	response = replace(response,"song",list[Math.round(rand)]);

	res.send(response);

});

app.listen(app.get('port'), () => {
	console.log("Running at locahost:" + app.get('port') + " . . .");
});