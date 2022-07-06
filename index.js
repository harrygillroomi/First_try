const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { STATUS_CODES } = require("http");


const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/list.html");
});

app.post("/", function(req,res){
    const first_name = req.body.first;    
    const last_name = req.body.last;
    const email = req.body.mail;
    const data = {
        members : [
            {
                email_address : email,
                status: "subscribed",
                merge_fields : {
                    FNAME : first_name, 
                    LNAME : last_name
                }
            }
        ]
    
    };
    var jsonData = JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/22f55968ac";
    const options = {
        method : "post",
        auth : "Harry:ca36898be9278901af567dff99f66897-us14"
    }
    const request = https.request(url , options , function(response){
        response.on("data" , function(data){
            console.log(JSON.parse(data));
        }) 
        if (response.statusCode == 200){
            res.send("suck sex full");
        }
        else{
            res.send(" Un Suck Sex Full");
        }
    });

    request.write(jsonData);
    request.end();
})





app.listen(process.env.PORT || 3000,function(){
    console.log("Port running");
}); 




// ca36898be9278901af567dff99f66897-us14
// 22f55968ac
