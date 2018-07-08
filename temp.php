<html>
  <head>
   <title>Demonstrateur SigFox</title>
  </head>
  <body>
  <?php
     $_id = $_GET["id"];
     $_time = $_GET["time"];
     $_signal = $_GET["signal"];
     $_station = $_GET["station"];
     $_lat = $_GET["lat"];
     $_lng = $_GET["lng"];
     $_rssi = $_GET["rssi"];
     $_data = $_GET["data"];
     $_avgSignal = $_GET["avgSignal"];

     if ( $fl = fopen(('sigfoxData' .$_id. '.json'),'a')) {
       fwrite($fl,"\"data\": { \"id\" : \"". $_id . "\", "
		                     ."\"time\" :\"" . $_time . "\", "
							 ."\"signal\" :\"" . $_signal . "\", "
							 ."\"station\" :\"" . $_station . "\", "
							 ."\"lat\" :\"" . $_lat . "\", "
                             ."\"lng\" :\"" . $_lng . "\", "
							 ."\"rssi\" :\"" . $_rssi . "\", "
							 ."\"data\" :\"" . $_data . "\", "
							 ."\"avgSignal\" :\"" . $_avgSignal . "\" }\n" );
       fclose($fl);
     }
  ?>
  </body>
</html>