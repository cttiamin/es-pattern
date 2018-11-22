<?php
header("Access-Control-Allow-Origin: *");//允许任何域的请求
//header("Access-Control-Allow-Origin: http://www.mdj0.com");//允许指定域

/**
     *      Access-Control-Allow-Origin: http://www.nczonline.net
     *      Access-Control-Allow-Method: POST, GET
     *      Access-Control_Allow-Headers: NCZ
     *      Access-Control-Max-Age: 172800

 * */

    header("Content-Type: text/plain");
    header("XDomainRequestAllowed: 1");
    header("Content-Length: 27");
    echo "Some data";
    flush();
    echo "Some data";
    flush();
    echo "Some data";
    flush();
?>
