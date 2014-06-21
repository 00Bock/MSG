MSG visualisation of energy
===

automatic global monitoring system for micro smart grids

Aktueller Stand
- index.html -> Marker auf verschiedenen Basemaps mit Infopanel
- index_ownMarker.html -> eigene Marker mit Popup
- index_swipe.html -> Luftbild und dunkle Karte als Swipefunktion + Marker + D3-Elemente (nicht animiert) + Legende

Instructions to access the BeMobility Database (In InnoZ) - from Windows 7
by Mauricio Rojas
11.02.2014

1. Connect to WLAN BeMobility2-guest
	Password: 
2. Download and Install OpenVPNClient
	http://openvpn.net/index.php/access-server/download-openvpn-as-sw/357.html
3. Using the VPN configuration file innoz-innoz.ovpn, create a VPN to the LAN segment where the SQL server is located.

Content of file innoz-innoz.ovpn:

#*************************************
# Uses TU Sense VPN + routes BeMobility-simulation
#remote innoz.no-ip.org 1198 udp
#Access to VPN only over BeMobility2-Guest (LAN 172.16.21.xx)
remote 172.16.21.1 1198 udp
dev tun
client
remote-cert-tls server
nobind
comp-lzo
persist-key
persist-tun
cipher AES-128-CBC
route 172.16.11.41 255.255.255.255

<ca>
-----BEGIN CERTIFICATE-----
-----END CERTIFICATE-----
</ca>
<cert>
-----BEGIN CERTIFICATE-----
-----END CERTIFICATE-----
</cert>
<key>
-----BEGIN RSA PRIVATE KEY-----
-----END RSA PRIVATE KEY-----
</key>

#*************************************

4. Make sure that the VPN is created, and that the server is reachable, by ping the SQL server from a DOS prompt:
	C:\> ping 172.16.12.10
	
	Ping wird ausgefhrt fr 172.16.12.10 mit 32 Bytes Daten:
	Antwort von 172.16.12.10: Bytes=32 Zeit=2ms TTL=127
	Antwort von 172.16.12.10: Bytes=32 Zeit=2ms TTL=127
	Antwort von 172.16.12.10: Bytes=32 Zeit=3ms TTL=127
	Antwort von 172.16.12.10: Bytes=32 Zeit=7ms TTL=127

	Ping-Statistik fr 172.16.12.10:
		Pakete: Gesendet = 4, Empfangen = 4, Verloren = 0 (0% Verlust),
	Ca. Zeitangaben in Millisek.:
		Minimum = 2ms, Maximum = 7ms, Mittelwert = 3ms
		
5. There are two ways to connect to the DB. Both will be explained. The first is sqlcmd, a command prompt utility that can be obtained after installing the following programs
	Microsoft® ODBC Driver 11 for SQL Server® - Windows -> msodbcsql.msi
	Microsoft® Command Line Utilities 11 for SQL Server® -> MsSqlCmdLnUtils.msi
	
	Insert the following directoyry in the PATH:
	
	C:\Program Files\Microsoft SQL Server\Client SDK\ODBC\110\Tools\Binn
	
	In a DOS command prompt, run following:
	C:\> sqlcmd -S 172.16.12.10\EUREF_MSG2,1444 -U INNOZ  -P Innoz
	
	Appears 
	
	1>
	
	Then run 
	1> USE StruxureWareReportsDB (return)
	2> GO
	Changed database context to 'StruxureWareReportsDB'.
	
	Another possible context is DAI_LABOR.
	
	From there, SQL commands can be run. Please see the guide 'Use the sqlcmd Utility.pdf' for more information.
	
	To exit, please type 
	1> exit
	
6. The second way is to use the program MiniSqlQuery, to be downloaded from
	http://minisqlquery.codeplex.com/
	
	Once installed, a connection string has to be programmed.
	a. run the program MiniSqlQuery.exe
	b. Edit > Edit Connection Strings
	c. Add
	d. Name = BeMobility
	e. Select COnnection String in the section Daten, and paste the following:
		Data Source=172.16.12.10\EUREF_MSG2,1444;Initial Catalog=StruxureWareReportsDB;User ID=INNOZ;Password=Innoz
	f. Ok, Ok.

	To connect to the database, in the drop down box Connection, select the BeMobility option. The Database structure appears in the left side.
	SQL queries can be run in the right side, and the results appear in the lower part. Then the data can be exported from the menu Plugins > Export Data.
	
7. To disconnect make sure that the programs are off, and then, disconnect the VPN client.
