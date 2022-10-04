# Registration Workflow

1. User füllt den ersten Schritt aus, bei dem man nur seine E-Mail Adresse eingibt.
2. Die Daten werden an POST /anmeldung/group geschickt
3. Die Gruppe wird im Backend angelegt und ein Link mit einem JSON Web Token an den User per E-Mail geschickt über den er die Anmeldung verwalten kann (im Moment wird der JSON Web Token direkt in der API ausgegeben, damits einfach fürs Development ist)
4. Der User klickt auf den Link und kommt so zum Formular. Der JWT und die groupId ist als GET parameter in der URL
5. User füllt Daten aus und klickt immer wieder mal auf Zwischenspeichern
6. Zwischenspeichern schickts an PUT /anmeldung/tempStorage/{groupId} (Authorization header mit "Bearer [jwt]")
7. User kommt später wieder über den Link aus der E-Mail um weitere Daten einzugeben
8. Per HEAD /anmeldung/tempStorage/{groupId} (Authentication mit JWT) wird geprüft ob Daten im Zwischenspeicher sind
9. Per GET /anmeldung/tempStorage/{groupId}  (Authentication mit JWT) werden die Daten im Zwischenspeicher abgerufen und ins Formular übertragen
10. User füllt fehlende Daten aus
11. User lädt eine Datei hoch (POST an /files/{groupId}, Authentication mit JWT) kriegt da ne file ID zurück, file ID wird im Feld gesetzt
12. User schickt das Formular final ab
13. Die Daten werden an  PUT /anmeldung/group/{groupId}  (Authentication mit JWT) gesendet
14. Daten werden im Backend gespeichert und Folgeprozesse (Führungszeugnis prüfen) wird angestoßen
15. Frontend löscht die Daten aus dem Zwischenspeicher (DELETE /anmeldung/tempStorage/{groupId}, Authentication mit JWT)
16. User kommt später wieder über den Link um was zu ändern
17. Gespeicherte Daten laden per GET /anmeldung/group/{groupId} (Authentication mit JWT) und ins Formular übertragen
18. Zwischenspeichern nicht mehr möglich
19. (Schritte 10-14 werden wiederholt)


## ToDo
- Die Info-Seite vor der Eingabe der Daten
- Die Quick-Facts in der personCard
- Anzeige der globalen Fehlermeldungen
- Teilnahmegebühr berechnung
- Formular endgültig übermitteln
- daten nicht aus tempstorage laden, sondern aus GET /anmeldung/{gruppe} (sobald das erste mal übermittelt)
- bestätigungsseite
- Verlinkung der Anmeldung auf der Startseite

## Erledigt
- Design und Funktion der "Gruppe erstellen" Seite
- Anmeldung Auswahl Seite