const express = require('express')
const app = express()
const https = require('https')
const port = 3000
const bodyParser = require('body-parser');

const apiKey = require("./api_key.js");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.send("index.html")
})


app.get('/restaurants', (req, qres)=>{
  var options = {
    headers: {Authorization: "Bearer " + apiKey}
  }
  https.get("https://api.yelp.com/v3/businesses/search?location=92116", options, function(res){
    //const { statusCode } = res;
    //const contentType = res.headers['content-type'];

    // let error;
    // // Any 2xx status code signals a successful response but
    // // here we're only checking for 200.
    // if (statusCode !== 200) {
    //   error = new Error('Request Failed.\n' +
    //                     `Status Code: ${statusCode}`);
    // } else if (!/^application\/json/.test(contentType)) {
    //   error = new Error('Invalid content-type.\n' +
    //                     `Expected application/json but received ${contentType}`);
    // }
    // if (error) {
    //   console.error(error.message);
    //   // Consume response data to free up memory
    //   res.resume();
    //   return;
    // }

    //res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        // console.log(parsedData);
        qres.send(parsedData);
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})