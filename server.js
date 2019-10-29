//https://medium.com/the-node-js-collection/simple-server-side-cache-for-express-js-with-node-js-45ff296ca0f0

let express = require('express')
let app = express()
let Jimp = require('jimp');
let marker = require('image-watermark');

app.get('/', function (request, resonse) {
    //Collects the paramter values from the request
    let res = req.query.res; 
    let bgcol = req.query.bgcol; 
    let watermark = req.query.watermark; 
    let ext = req.query.ext;

    let img = "01_04_2019_001103.png";

    try
    {
        //Tries to parse to number
        res = Number(res);

        //If it can't value will be NaN
        if((!isNaN(res))||watermark.length <=20||/^[0-9A-F]{6}$/i.test(bgcol)||(ext==="jpg"||ext==="png"))
        {
            console.log("Load: "+ img+ "   " + res + " " + watermark+ " "+ bgcol + " " + ext)

            let resX = res;
            let resY = (res/16)*9

            console.log("Aspect ratio: 16:9   resX="+resX+" resY="+resY);
        }
        else
        {
            res.status(400).send();
        }
    }
    catch(error){
        res.status(400).send();//Any issues parsing data then 400
    }
    finally{
        //Test if the values aren't null and process the image
        //Cache last 10 results 
    }
})

app.listen(3000)