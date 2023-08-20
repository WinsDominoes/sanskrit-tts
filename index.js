const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const tts = require("sanskrit-tts")
const { v4: uuidv4 } = require('uuid');

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors({
    origin: '*'
}))

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public')) 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('pages/home.ejs')
})

app.post('/api/tts', (req, res) => {
    console.log("TTS Request")

    const body = req.body;
    let text = body.text;
    let script = body.script;

    if(body) {
        if(script) {
            if(text) {
                console.log("Request Body");
                console.log("Text: " + text)
                console.log("Script: " + script)
        
                let fileName = "audio/" + uuidv4() + ".mp3"; 
                console.log("File Path: " + fileName)
        
                tts.saveFile(text, { 
                    script: script, 
                    slow: true, 
                    fileName: "public/" + fileName 
                });
        
                res.status(200).send({
                    "response": true,
                    "message": "TTS request successful!",
                    "url": "/" + fileName
                })
            } else {
                res.status(403).send({
                    "response": false,
                    "message": "Text cannot be empty!"
                })
            }
        } else {
            res.status(403).send({
                "response": false,
                "message": "Writing script cannot be empty!"
            })
        }  
    } else {
        res.status(403).send({
            "response": false,
            "message": "Request body cannot be empty!"
        })
    }

      
});

app.listen(port, () =>
    console.log(`App is listening on port ${port}.`) // this is where the node app will be started
)