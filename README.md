MSG - visualisation of energy
=====

global monitoring system for micro smart grids

Stand 15.08.2014

**Index-Dateien**
- *index.html* -> Marker auf verschiedenen Basemaps mit Infopanel
- *index_ownMarker.html* -> eigene Marker mit Popup
- *index_swipe.html* -> Luftbild und dunkle Karte als Swipefunktion + Marker + D3-Elemente (nicht animier) + Legende
- *index_boot.html* -> !!!AKTUELLE VERSION!! in der entwickelt wird; Grundstruktur basiert auf Bootstrap

**Branches**
- *master* -> master-branch
- *bootstrap* -> ist zum jetzigen Stand die am weitesten entwickelte Version
- *animation* -> enthält Ansätze zur Verbesserung der Animation, die Momentan nur für eine Linie gut funktioniert

Einrichten der Arbeitsumgebung
====

Aktuell unter Windows entwickelt. Läuft das auch unter Linux?

Kompatibilität aktuell nur mit Firefox gewährleistet!

Framewort basiert auf HTML, CSS und JavaScript

Folgende Bilbliotheken werden verwendet:
- JQuery
- Bootstrap
- Leaflet
- Mapbox
- D3
- Data Visualization Framework (DVF)
 
Zum Bearbeiten den Code clonen und mit einen Texteditor (Notepad++) verändern.

Daten
====

Aktuell werden die Daten aus einer Testdatei gelesen. --> "data/data_producer.json"

Anbindung der Daten geht nur über VPN und WLAN. Mauricio Rojas ist der Ansprechpartner. GetRequest mit IDs von DAI sieht folgendermaßen aus:

http://172.16.19.20:8083/IpinVisualizationService/getData?ids=[403,64,365,355,5,6,8,10,12,14,344,346,348,350,353,68,294,440]
