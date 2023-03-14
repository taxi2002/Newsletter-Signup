
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
    
})
// API KEY
// 1a912b6c440be76dec518a33c494487d-us21

// LIST KEY
// e91a168515 
app.post("/", function(req, res){
    
    const fname = req.body.FirstName;
    const lname = req.body.LastName;
    const email = req.body.Email;
    // console.log(fname, lname, email);

    const data ={
                email_address: email,
                status: "subscribed",
                merge_fields: 
                {
                    FNAME: fname,
                    LNAME: lname
                }
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/e91a168515/members"
    const options = {
        method: "POST",
        auth: "taxiarchis:1a912b6c440be76dec518a33c494487d-us21"
    }
     
    const request = https.request(url, options, function (response) {
        
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        }
        else{ res.sendFile(__dirname + "/failure.html")}


        // response.on("data", function(data){
        //     console.log(JSON.parse(data)); 
        // })
        console.log(response.statusCode)
    })

    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/")
})


app.listen(process.env.PORT || 3000, function () {
    console.log("Server is runnig on port 3000")
})