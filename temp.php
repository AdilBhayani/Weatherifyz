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

     if ( $fl = fopen('sigfoxData.json','a')) {
       fwrite($fl,"\"data\": { \"id\" : \"". $_id . "\", "
                             ."\"data\" :\"" . $_data . "\", "
                             ."\"from\" :\"" . $_station . "\", "
                             ."\"lat\" :\"" . $_lat . "\", "
                             ."\"lng\" :\"" . $_lng . "\" }\n" );
       fclose($fl);
     }
  ?>
  </body>
</html>