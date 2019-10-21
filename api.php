<?php
//Created by Tom Misson 

//https://stackoverflow.com/questions/10751227/remove-image-background-with-php-and-save-transparent-png
//https://stackoverflow.com/questions/7263923/how-to-force-file-download-with-php
//https://www.php.net/manual/en/function.header.php
//https://www.php.net/manual/en/ref.image.php
//https://en.wikipedia.org/wiki/List_of_HTTP_status_codes

//http://localhost:82/mainAPI.php?res=500,500&bgcol=fff&watermark=%22get%20ready%20to%20party%22&ext=jpg


/*Working order
-Configure API to echo params [DONE]
-Search for image
-Open image and read documentation for GD and image functions
-Process image according to params
-push download
*/

$file = 'monkey.gif';

if(isset($_GET['resX']) and isset($_GET['resY']))
{
    if(is_int($_GET['resX']) and is_int($_GET['resY']))
    {
        header("HTTP/1.1: 200 OK");
    }
    else{
        header("HTTP/1.1: 400 Bad request");
    }
}
else
{
    header("HTTP/1.1: 400 Bad request");
}

if(isset($_GET['bgcol']))
{
    if(preg_match("([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})",$_GET['bgcol']) and strlen($_GET['bgcol'])<=6)
    {
        //Is hex colour
        header("HTTP/1.1: 200 OK");
    }
    else{
        header("HTTP/1.1: 400 Bad request");
    }
}

if(isset($_GET['watermark']))
{
    if(!(strlen($_GET['watermark']) > 20))
    {
        //Is less than 20 characters
        header("HTTP/1.1: 200 OK");
    }
    else{
        header("HTTP/1.1: 400 Bad request");
    }
}

if(isset($_GET['ext']))
{
    if($_GET['ext']=="jpg" or $_GET['ext']=="gif" or $_GET['ext']=="png")
    {
        header("HTTP/1.1: 200 OK");
    }
    else{
        header("HTTP/1.1: 400 Bad request");
    }
}

if(http_response_code(200))
{
    if (file_exists($file)) {
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="'.basename($file).'"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($file));
        readfile($file);
        exit;
    }
}

?>