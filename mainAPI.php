<?php
//Created by Tom Misson 

//https://stackoverflow.com/questions/10751227/remove-image-background-with-php-and-save-transparent-png
//https://stackoverflow.com/questions/7263923/how-to-force-file-download-with-php
//https://www.php.net/manual/en/function.header.php
//https://www.php.net/manual/en/ref.image.php
//https://en.wikipedia.org/wiki/List_of_HTTP_status_codes

//http://localhost:82/mainAPI.php?res=500,500&bgcol=fff&watermark=%22get%20ready%20to%20party%22&ext=jpg


/*Working order
-Configure API to echo params [NED to clense]
-Create image db
-Search for image
-Open image and read documentation for GD and image functions
-Process image according to params
-push download
*/


if(isset($_GET['res']))
{
    echo $_GET['res']."</br>";
    
    $values = explode(',', $_GET['res'], 2);

    foreach ($values as $value){
        var_dump($value);
        if(is_integer($value)){
            echo "alls good";
            
        }
    }
}

if(isset($_GET['bgcol']))
{
    echo $_GET['bgcol']."<br/>";
    if(preg_match("([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})",$_GET['bgcol']))
    {
        //Is hex colour
    }
}

if(isset($_GET['watermark']))
{
    echo $_GET['watermark']."<br/>";
}

if(isset($_GET['ext']))
{
    echo $_GET['ext']."<br/>";
}





?>