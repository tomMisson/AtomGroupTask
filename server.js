//http://localhost:3000/?img=01_04_2019_001103.pngresX=1000&resY=1000&ext=jpg

let express = require('express')
let app = express()
let jimp = require('jimp');
let NodeCache = require( "node-cache" );
let myCache = new NodeCache( { stdTTL: 7200, checkperiod: 600 } );
let fs = require('fs');


app.get('/', function (request, response) {
    //Collects the paramter values from the request
    let resX = request.query.resX; 
    let resY = request.query.resY; 
    let bgcol = request.query.bgcol; 
    let watermark = request.query.watermark; 
    let ext = request.query.ext;
    let img = request.query.img;


    try
    {
        //Tries to parse to number
        resX = Number(resX);
        resY = Number(resY);

        //If it can't value will be NaN
        if((img !=undefined &&ext!=undefined&&resX!=undefined&&resY!=undefined)&&(!isNaN(resX)&&!isNaN(resY))||watermark.length <=20||/^[0-9A-F]{6}$/i.test(bgcol)||(ext==="jpg"||ext==="png"||ext==="tiff"||ext==="gif"||ext==="bmp"))
        {
            console.log("Load: "+ img+ "   " + resX +" "+ resY+ " " + watermark+ " "+ bgcol + " " + ext)
        
            key=img+ext+resX+resY+watermark+bgcol;
 
            //if key doesn't exist in the cache, create the image again 
            if(myCache.get( key ) == undefined)
            {

                imageObj = jimp.read("product_images/"+img, (err, image) => {
                    if (err) throw err;

                    image.resize(resX, resY)// resize
                    .write('output-images/output.'+ext);// save to disk
                });
            
                //Tries to cache 
                if(myCache.set( key, imageObj, 7200  ))
                {
                    
                    fs.createReadStream(wordsFile).pipe(response);//Created new content in cache
                    response.status(201);
                }
                else
                {
                    response.status(500).send();//If unable to cache result  
                }
            }
            else
            {
                imageFromCache = myCache.get(key);
                response.status(200).sendfile();
            }
        }
        else
        {
            response.status(204).send({error:"Invalid data entered"});//No content if validation of data fails
        }
    }
    catch(error){
        response.status(500);//Any issues parsing data then 400
    }
}) 

app.listen(3000)