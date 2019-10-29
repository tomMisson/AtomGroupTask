//https://medium.com/the-node-js-collection/simple-server-side-cache-for-express-js-with-node-js-45ff296ca0f0

let express = require('express')
let app = express()
let jimp = require('jimp');
let NodeCache = require( "node-cache" );
let myCache = new NodeCache( { stdTTL: 7200, checkperiod: 600 } );

app.get('/', cache(10), function (request, resonse) {
    //Collects the paramter values from the request
    let res = request.query.res; 
    let bgcol = request.query.bgcol; 
    let watermark = request.query.watermark; 
    let ext = request.query.ext;

    let img = "01_04_2019_001103.png";

    try
    {
        //Tries to parse to number
        res = Number(res);

        //If it can't value will be NaN
        if((!isNaN(res))||watermark.length <=20||/^[0-9A-F]{6}$/i.test(bgcol)||(ext==="jpg"||ext==="png"||ext==="gif"||ext==="tiff"))
        {
            console.log("Load: "+ img+ "   " + res + " " + watermark+ " "+ bgcol + " " + ext)

            let resX = res;
            let resY = (res/16)*9

            console.log("Aspect ratio: 16:9   resX="+resX+" resY="+resY);
        }
        else
        {
            resonse.status(204).send();//No content if validation of data fails
        }
    }
    catch(error){
        resonse.status(400).send();//Any issues parsing data then 400
    }
    finally{
        key=img+ext+res+watermark+bgcol;

        //if key doesn't exist in the cache, create the image again 
        if(myCache.get( key ) == undefined)
        {
            if(res!=undefined)
            {

            }
            else if(watermark!=undefined)
            {
                
            }
            else if(ext!=undefined)
            {

            }
            else if(bgcol!=undefined)
            {

            }

            //Tries to cache 
            if(myCache.set( key, img, 7200  ))
            {
                resonse.status(201).send();
            }
            else
            {
                resonse.status(500).send();//If unable to cache result  
            }
        }
        else
        {
            imageFromCache = myCache.get(key);
            response.pipe();
            resonse.status(200).send();
        }
    }
})

app.listen(3000)