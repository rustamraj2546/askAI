###  initialize the project
npm init -y

### install gemini ai package
npm install @google/generative-ai

###  install dotenv package 
npm i dotenv

### store the API_KEY in .env file (environment variable)

###  configure the environment variable in the app.js by including below two line of codes
const dotenv = require("dotenv")
dotenv.config()

- run the Project --> `node .\app.js` or `nodemon .\app.js`
