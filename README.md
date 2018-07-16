# Chapp

## Installation

Das Frontend kann wie folgt gestartet werden:

```shell
git clone https://r-n-d.informatik.hs-augsburg.de:8080/kampferf/single-page-chatapp.git
cd single-page-chatapp
ng serve
```

Nun das Chatbackend (Java-Server) starten.
Nachdem die App gebaut wurde rufen Sie `localhost:4200`.

## Architektur

### Dienste

* SocketService
* UserService
* AlertService

### Komponenten

* Chatroom
  * PeopleList
  * RoomList
  * MessagesDisplay
  * InputField
* Login
* Logout
* Registration
* Settings

### Modelle

* BackendResponse
* InviteOPVoice
* Message
* MessageSet
* Rooms
* ShellIntterface
* User

## Implementierte Features

* Login / Logout
* Betreten und verlassen von Chat Räumen
* Nachrichten anderer User Lesen
* Nachrichten schreiben in Räumen
* Darstellung der Personen in einem Raum
* Darstellung aller Räume die Sie betreten haben
* Zeitdarstellung der Nachrichten
* Gruppierung von Nachrichten bei der Darstellung
* Registrierung neuer Benutzer
* Darstellung der Rollen der Person im Raum
* Verwalten des Raums (kommandozeile und via GUI)
  * Raum erfordert Spracherlaubnis
  * Personen Spracherlaubnis und Operator Rolle zuweisen
  * Raum erfordert Einladung von User
  * Personen in Raum einladen
  * Personen aus einem Raum raus werfen (als Op)
* Giphy Integration
* Logo
* Ansprechendes Design
* Autoscroll zur letzten Nachricht

### Login / Logout

Der User kann sich mittels E-Mail und Passwort einloggen.

### Betreten und verlassen von Chat Räumen

Der User kann mittels klicken auf einen Raum den Raum betreten und mittels mit einem Klick auf "Leave" den Raum verlassen.

### Nachrichten anderer User Lesen

Der User kann Nachrichten anderer User lesen.

### Nachrichten schreiben in Räumen

Der User kann Nachrichten in speizifischen Räumen schreiben. Nachrichten können nur in Räumen geschrieben werden.

### Darstellung der Personen in einem Raum

Personen in einem Raum werden in der Personenliste auf der linken Seite der Applikation angezeigt.

### Darstellung aller Räume die Sie betreten haben

Räume die betreten wurden, werden in der Raumliste auf der linken Seite der Applikation angezeigt.

### Zeitdarstellung der Nachrichten

Neben jeder Textnachricht findet sich ein Zeitstempel.

### Gruppierung von Nachrichten bei der Darstellung

Nachrichten von einem Benutzer werden in einer Chatblase gruppiert.

### Registrierung neuer Benutzer

Benutzer können sich über die Registrierungskomponente registrieren.

### Darstellung der Rollen der Person im Raum und die Manipulation dieser

Die Rollen von Personen im Raum werden durch Icons neben dem Namen dargestellt. OP's können im Dropdown Actions auf jeweilige Personen wirken, welche den Personen Rechte entziehen oder geben.
Außerdem funktioniert dies auch konsolenbasiert mit Befehl wie zum Beispiel `/giveop user-mail`, `/kick user-mail`, `/removeop user-mail`, `/givevoice user-mail` oder `/removevoice user-mail`.

### Verwalten des Raums (kommandozeile und via GUI)

Der Raum kann von OP's in der rechten Ecke des Chatfensters administriert werden.
Außerdem kann beispielweise via `/`

### Giphy Integration

Ein Benutzter kann mit `!giphy stichwort` ein Giphy-Meme in den Chatfenster einfügen. Dabei wird ein Bild, welches mit dem Stichwort getaggt wurde von der Giphy-API abgerufen und angezeigt.

### Logo

Das Logo der Chatapplikation Chapp zeigt ein Eichhörnchen und wird im Login und in der Room-List-View angezeigt.

### Ansprechendes Design

Die App ist in einem fröhlichen pastelligen Farbschema aus hellem grün und gelb gehalten um die Freude am chatten zu symbolisieren.

### Autoscroll zur letzten Nachricht

Wird eine neue Nachricht geschrieben, scrollt der View auf den Chatcontent automatisch nach unten zur letzten Nachricht.

### UI-Alerts

Dem User werden UI-Alerts angezeigt um ihn über Vorgänge zu informieren. Wie das joinen eines Raumes.

## Contributors (Individualleistungen)

### Michael Bielang

* Routing
* Grundstruktur zur Kommunikation mit dem Backend
* Login, Registrierung (Formvalidierung, Authentifizierung, erstes Bootstrap Styling, Komponenten)
* 1.Version des Logouts
* Ändern des Benutzernamens und des Passworts
* Users und Rooms-Modelle
* Senden von Nachrichten
* Empfangen und Anzeigen von Nachrichten
* Konsolenbasierte Raumverwaltung
* Personen Spracherlaubnis und Operator Rolle zuweisen (konsolenbasiert)
* Projektmanagement (Pflege des Issue Trackers, Terminplanung)

### Felix Kampfer

* Präsentationsfolien
* Giphy-Integration
* Überholung der Kommunikation mit dem Backend (BehaviorSubjects)
* Zeitdarstellung von Nachrichten
* Gruppierung von Nachrichten
* Caching von Nachrichten bei Raumwechsel
* Betreten und verlassen von Chat Räumen
* Darstellung der Personen in einem Raum
* Darstellung aller Räume die Sie betreten haben
* Darstellung der Anzahl der neuen Nachrichten in den gerade nicht sichtbaren Räumen
* Darstellung der Rollen der Person im Raum
* Visuelle Raumverwaltung
* Personen Spracherlaubnis und Operator Rolle zuweisen (visuell)

### Andreas Kottre

* Erste Version der Liste von Räumen
* Projektmanagement (Tooling, Linting)
* Styling der Login-Komponente
* Styling der Register-Komponente
* Styling der Settings-Komponente
* Styling des Chat-Room-View
* Styling der Nachrichten als Chat-Bubbles
* Logo & Design
* Dokumentation der Anwendung
* 2.Version des Logouts
* Automatisches Scrollen zur letzten geschrieben Nachricht
* UI-Alerts als Userfeedback
