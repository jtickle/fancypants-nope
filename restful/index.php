<?php

/**
 * ABSOLUTEY DO NOT USE THIS IN A PRODUCTION ENVIRONMENT BECAUSE THE
 * LIONS, TIGERS, AND THE BEARS AS WELL WILL BE ABLE TO COMPLETELY RUIN
 * YOUR SHIT.
 *
 * Permissioning is coming but as for now, a 'PUT' request will absolutely
 * write anywhere that apache can!
 */

require_once('com/files.php');
require_once('com/status.php');

$uri = $_REQUEST['uri'];
$headers = getallheaders();
$status = HTTP_200;

switch($_SERVER['REQUEST_METHOD']) {
case POST:
  // Post does not create new resource types
  if(!is_dir(dirname($uri))) {
    $status = HTTP_500;
  }
  // Create the file
  else {
    $status = HTTP_201;
    cp('php://input', $uri);
  }

  header("HTTP/1.1 {$status}");
  if($status === HTTP_201) {
    header("Location: {$uri}");
    header('Content-Type: application/json');
  }

  echo json_encode($uri);
  break;
case PUT:
  // File upload
  if(!file_exists($uri))
    $status = HTTP_201;

  // Try to create the directory if it doesn't exist
  if(!is_dir(dirname($uri))
     && !mkdir(dirname($uri), 0777, TRUE))
  {
      $status = HTTP_500;
  }
  // Copy the file
  else {
    cp('php://input', $uri);
  }

  // Headers
  header("HTTP/1.1 {$status}");
  
  if($status === HTTP_201) {
    header("Location: {$uri}");
    header('Content-Type: application/json');
    echo json_encode($uri);
  }
  
  break;
case DELETE:
  if(file_exists($uri)
     && (is_dir($uri) && @rmdir($uri)
         || unlink($uri)))
    $status = HTTP_204;
  else
    $status = HTTP_500;

  header("HTTP/1.1 {$status}");
  break;
case COPY:
  // Avoid some code duplication...
  $cmd = 'cp';
case MOVE:
  $cmd = isset($cmd) ? $cmd : 'mv';

  // If they didn't provide a destination tell them so
  if(!isset($headers['Destination'])) {
    header("HTTP/1.1 {$status}");
    exit;
  }
  $dst = $headers['Destination'];
  
  // If the file already exists ask the user to delete it first

  if(file_exists($dst))
    $status = HTTP_409;

  // If we can't copy the file it must not exist or there is some
  // permission error
  if(!call_user_func($cmd, $uri, $headers['Destination']))
    $status = HTTP_400;
  else
    $status = HTTP_204;

  header("HTTP/1.1 {$status}");
  break;
}

echo "\n";

//?>
