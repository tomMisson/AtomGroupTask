#https://medium.com/the-node-js-collection/simple-server-side-cache-for-express-js-with-node-js-45ff296ca0f0

let express = require('express')
let app = express()
let Jimp = require('jimp');

app.get('/', function (req, res) {
    //Collects the paramter values from the request
    let resX = req.query.resX; 
    let resY = req.query.resY; 
    let bgcol = req.query.bgcol; 
    let watermark = req.query.watermark; 
    let ext = req.query.ext;
    let img = req.query.img;

    try
    {
        //Tries to parse to number
        resX = Number(resX);
        resY = Number(resY);

        //If it can't value will be NaN
        if((!isNaN(resX) && !isNaN(resY))||watermark.length <=20||/^[0-9A-F]{6}$/i.test(bgcol)||(ext==="jpg"||ext==="png"))
        {
            console.log("Load: "+ img+ "   " + resX + " " + resY + " " + watermark+ " "+ bgcol + " " + ext)
        }
    }
    catch(error){
        res.status(400).send();//Any issues parsing data then 400
    }
    finally{
        bgcol = bgcol+"ff"//Appends ff for full alpha value of background processing

        Jimp.read("./product_images/"+img, (err, image) => {

            if (err) throw err;
            image
              .resize(resX, resY) // resize
              .background(parseInt(bgcol,16))//Only works on JPG as transparency is replaced 
              .write('test.'+ext); // save
          });
          res.status(200).send();

    }
})

app.listen(3000)