const express = require("express");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing")
const app = express();
const port = 7000;

app.use(express.json()); // body parser code
app.use(express.urlencoded({extended: true})); // body parser code
app.use(express.static("public")); // static page code or to render both html and css files

mailchimp.setConfig({
    apiKey:"69ee20cf807cb883c22551495da24f50-us13",
    server: "us13"
});

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req,res) => {
    // const firstName = req.body.fName;
    // const lastName = req.body.lName;
    // const email = req.body.email;
    const listId = "58d96da6fd";

//Creating an object with the users data

    const subscribingUser = {
        firstName: req.body.fName,
        lastName: req.body.lName,
        email: req.body.email,
    }

    // const data = {
    //     memeber: [
    //         {
    //             email_address: email,
    //             status: "subscribed",
    //             merge_fields: {
    //                 FNAME: firstName,
    //                 LNAME: lastName,
    //             }
    //         }
    //     ]
    // }

      async function run() {
        const response = await mailchimp.lists.addListMember(listId,{
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                                FNAME: subscribingUser.firstName,
                                LNAME: subscribingUser.lastName,
                            }
        });

        res.sendFile(__dirname + "/success.html");
        console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}.`);
      }
      
    run().catch(e => res.sendFile(__dirname + "/failure.html"));

});
// to redirect home page
app.post("/failure", (req,res) => {
    res.redirect("/");
})


app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})



//api key
//69ee20cf807cb883c22551495da24f50-us13
//list id
//58d96da6fd
//