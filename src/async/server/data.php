<?php
    header("Content-Type: text/plain");   
    echo <<<EOF
ID: {$_GET['id']}
Limit: {$_GET['limit']}
EOF;
?>
