const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Body parser middleware   --> this is impo for handling post req
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serving public files
app.use("/public", express.static("public"));

//it tells express to use ejs as a viewengine that will then render dynamic content
app.set("view engine", "ejs");


const { GoogleGenerativeAI } = require("@google/generative-ai");

const dotenv = require("dotenv");
dotenv.config();

let generatedString;

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run(prompt) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    generatedString = text;
    console.log(text);
    return text;
}


//  ------------- handling routes -------------------------------------------------------------------------------------

app.get('/', (req, res) => {
    res.render("index") //  serving HTML file
})

app.get('/about', (req, res) => {
    res.render("about") //  serving HTML file
})

app.get('/contact', (req, res) => {
    res.render("contact") //  serving HTML file
})

app.get('/feedback', (req, res) => {
    res.render("feedback") //  serving HTML file
})

app.get('/help', (req, res) => {
    res.render("help") //  serving HTML file
})


app.post('/', (req, res) => {
        
    const prompt = req.body.prompt; // this works bz of bodyParser middleware

    let result =  run(prompt);
    
    result.then((out)=>{
        console.log(out);
            
        res.send(`${out} `);
    }).catch((err)=>{
        console.log("Error/Failed");
        res.send("Failed/Try again or refresh");
    })

});

//  Listening to port -----------------------------------------------------------------------
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
