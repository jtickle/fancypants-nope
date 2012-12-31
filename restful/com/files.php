<?php

function cp($a, $b) {
  if(($ah = fopen($a, 'r')) === FALSE
     || ($bh = fopen($b, 'w')) === FALSE)
    return FALSE;

  stream_copy_to_stream($ah, $bh);

  return fclose($ah) 
    && fclose($bh);
}

function mv($a, $b) {
  return cp($a, $b)
    && unlink($a);
}

//?>
