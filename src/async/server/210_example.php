<?php
header("Content-Type: text/plain");
header("MyHeader: MyNewValue");

echo "Value of MyHeader: Http_MyHeader
    User-agent:HttpUser_Agent";

/**    echo <<<EOF
Value of MyHeader: Http_MyHeader
User-agent: HttpUser_Agent
EOF;    
 */
/* 
     echo <<<EOF
Value of MyHeader: {$_SERVER['HTTP_MYHEADER']}
User-agent: {$_SERVER['HTTP_USER_AGENT']}
EOF;
*/

?>
