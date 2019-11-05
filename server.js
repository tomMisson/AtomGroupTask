let express = require('express')
let app = express()
let jimp = require('jimp');
let NodeCache = require("node-cache");
let myCache = new NodeCache({ stdTTL: 7200, checkperiod: 600 });
let data;


app.get('/', function(request, response) {
    //Collects the paramter values from the request
    //params for url - resX - x resolution of new image,resY - y resolution of new image,bgcol,watermark - watermar for accross the image,ext - extension,img - image to use
    let resX = request.query.resX;
    let resY = request.query.resY;
    let bgcol = request.query.bgcol;
    let watermark = request.query.watermark;
    let ext = request.query.ext;
    let img = request.query.img;



    try {
        //Tries to parse to number
        resX = Number(resX);
        resY = Number(resY);

        //If it can't value will be NaN
        if ((img != undefined && ext != undefined && resX != undefined && resY != undefined) 
        && (!isNaN(resX) && !isNaN(resY)) /*|| watermark.length <= 20 || /^[0-9A-F]{6}$/i.test(bgcol)*/ 
        || (ext === "jpeg" || ext === "png" || ext === "bmp")) {

            
            console.log("Load: " + img + "   " + resX + " " + resY + " " + watermark + " " + bgcol + " " + ext)

            key = ext.concat(+img + resX + resY + watermark + bgcol);

            //Try to retrive from cache
            cacheBuffer = myCache.get(key);

            //if key doesn't exist in the cache, create the image again 
            if (cacheBuffer == undefined) {
                //If it can't create an instance of the 
                imageObj = jimp.read("product_images/" + img, (err, image) => {
                    if (err) {
                        response.status(404).send({ 'error': "File not found" });
                        throw err;
                    };

                    image.resize(resX, resY) // resize
                        .writeAsync('output.'+ext)
                        .getBufferAsync('image/' + ext)
                        .then(buff => stream.pipe(buff))
                        .then(buff => myCache.set(key, buff, 7200))
                        .then(response.status(201))
                        .catch(err => response.status(500));

                });
            } else {
                //Pull from cache
                stream.pipe(cacheBuffer);
            }
        } else {
            response.status(204).send({ 'error': "Missing or invalid data" }); //No content if validation of data fails
        }
    } catch (error) {
        console.log(error)
        response.status(500).send({ 'error': "Error server side" }); //Any issues parsing data then 400
    }
})

app.listen(3000)