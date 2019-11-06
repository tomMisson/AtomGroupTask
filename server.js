let express = require('express')
let app = express()
let jimp = require('jimp');
let fs = require('fs');

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
        if ((img != undefined && ext != undefined && resX != undefined && resY != undefined) &&
            (!isNaN(resX) && !isNaN(resY)) /*|| watermark.length <= 20 || /^[0-9A-F]{6}$/i.test(bgcol)*/ ||
            (ext === "jpeg" || ext === "png" || ext === "bmp")) {


            console.log("Load: " + img + " " + resX + " " + resY + " " + watermark + " " + bgcol + " " + ext)

            imgWOdot = img.replace('.', '');//removes . from extension to avoid confusing the filesystem when saved locally

            key = imgWOdot.concat(" " + resX + " " + resY + " " + watermark + " " + bgcol);

            let cacheFileName = "outputfiles/" + key + "." + ext;

            //if key doesn't exist in the cache, create the image again 
            if (!fs.existsSync(cacheFileName)) {
                //If it can't create an instance of the 
                console.log(cacheFileName);
                imageObj = jimp.read("product_images/" + img, (err, image) => {

                    if (err) {
                        response.status(404).send({ 'error': "File not found" });
                        throw err;
                    };

                    image.resize(resX, resY) // resize
                    image.writeAsync(cacheFileName) //write to cache
                    .then(console.log("File made"))//Waits till file is saved to return message 
                    .then(response.sendfile(cacheFileName))

                })
                response.status(201)//created new content
            } else {
                response.sendfile(cacheFileName)
                response.status(200)//Send from cache
            }
        } else {
            response.status(204).send({ 'error': "Missing or invalid data" }); //No content if validation of data fails
        }
    } catch (error) {
        console.log(error)
        response.status(500).send({ 'error': "Error server side" }); //Any issues parsing data/handling image then 500
    }
})

app.listen(3000)