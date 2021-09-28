# ![Who Am I](client/src/img/logo.png) <br/> WebE, Web Engineering

**INF-P-WT002, BE-Sa-1, HS21/22, FFHS Bern** \
*unter der Leitung von Dr. Heinrich Zimmermann* \
*eingereicht von Ramona Koksa | Yves Bastian Pellaton*
***

## Inhalt

[[_TOC_]]

## Einführung

> «A game is a series of interesting choices.» – Sid Meier

Im Rahmen des Moduls Web Engineering (WebE) haben wir den Auftrag erhalten, ein Spiel zu entwickeln. Die
Rahmenbedingungen werden durch das Modul vorgegeben und werden aus dem Dokument «Projektarbeit_WebE-Beschreibung»
entnommen.

## Spielregeln

Das Spiel «Who Am I» ist ein Ratespiel, bei dem zwei oder mehr Spieler eine Person verkörpern und raten müssen wer sie
sind. Es dürfen nur Fragen, die mit «Ja» oder «Nein» beantwortet werden können (geschlossene Fragen) gestellt werden.
Werden die Fragen mit «Ja» beantwortet, dürfen weitere Fragen gestellt werden. Wenn nicht, dann ist der nächste Spieler
dran. Ziel ist es möglichst schnell zu erraten, wen man verkörpert.

## Projektziele

| ID | Systemziele                                                                              | *M*uss / *K*ann |
|----|------------------------------------------------------------------------------------------|:-------------:|
| 1  | Das System soll die Benutzer über eine ansprechende, grafische Oberfläche führen.        | M           |
| 2  | Die Kommunikation des Spiels muss über einen Chat stattfinden.                           | M           |
| 3  | Es müssen mind. drei Levels mit unterschiedlichen Schwierigkeitsstufen sein.             | M           |
| 4  | Das System soll auf Deutsch und Englisch zur Verfügung stehen. Standardsprache: Englisch | K           |
| 5  | Die Kommunikation kann auch über ein Gespräch (Voice) stattfinden.                       | K           |
| 6  | Chatbot – man spielt gegen einen Bot.                                                    | K           |

| ID | Vorgehensziele                                                               | *M*uss / *K*ann |
|----|------------------------------------------------------------------------------|:-------------:|
| 1  | Die Entwicklung des Projektes soll iterativ erfolgen                         | M           |
| 2  | Termine und Deadlines sind einzuhalten.                                      | M           |
| 3  | CI / CD soll angewendet werden | K           |

### Arbeitsablauf

1. Ein Issue wird erstellt. Er bekommt entsprechende Tags und verwendet wo vorhanden die Vorlage.
1. (Bei Grossem Aufwand oder Impact) Der Issue wird diskutiert und mit ~"status::todo" als beriet für die Entwicklung
   markiert
1. Der Issue wird assigend und wenn begonnen wird mit ~"status::progress" markiert. Es wird
   aus [dev](https://git.ffhs.ch/ramona.koksa/whoami/-/tree/dev) ein neuer branch erstellt. Es kann bereits ein
   merge-request erstellt werden, dieser sollte aber als `DRAFT:` makiert sein.
1. Mit `/spend` kann die verwendete Zeit getrackt werden.
1. Ist der Code ready, wird ein merge-request erstellt oder beim bestehenden die `DRAFT:` markierung entfernt. Der
   merge-request ist mit dem issue zu verknüpfen: `Resolves #9` sollte reichen. Es ist sicherzustellen, dass der branch
   auf dev rebased ist und die History sauber ist.
1. Die andere Person assignen und das label ~"status::review" setzen.
1. Die andere Person reviewt die Arbeit, gibt Feedback und fordert die Definition of Done ein. Ist sie glücklich, merget
   sie nach dev.

### Definition of Done

- Die verwendeten Bibliotheken (Libraries) werden dokumentiert
- Beschreibung der Funktionalität erstellt
- Struktur des Programms dokumentiert
- Entsprechende Userdokumentation erstellt
- Testbare Funktionalität getestet
- Peer reviewed

***

## Anforderungen

Sämtliche Anforderungen (funktional- und nicht-funktional) werden im vorliegenden Repository
unter [issues](https://git.ffhs.ch/ramona.koksa/whoami/-/issues) beschrieben. Die User Stories werden mit dem Label 
~user-story versehen. 
Einen ersten Überblick verschaffen die nachfolgenden Wireframes.

![wireframe of the login](client/src/img/login-wireframe.png)
![wireframe of the game](client/src/img/game.png)

## Getting started

```bash
git clone
npm ci
cd /client
npm ci
cd ..
npm run start-all
```

## Architektur

Die Applikation besteht aus zwei Teilen: dem Frontend und dem Backend. Diese werden in den folgenden Abschnitten
beschrieben Gemeinsam existiert [der common Ordner](client/src/common), auf welchen auch das Backend zugreift.

### Backend

Das Backend ist ein simples `express` mit einem server.js, welches sowohl websockets als auch http requests
entgegennimmt.

### Frontend

Das Frontend ist React basiert und befindet sich under [client/](client/). Bei der Entwicklung existiert hierzu ein
development server, welcher jeweils einen build erstellt und diesen an den Client sendet. Für den Kunden kann dann ein
produktiv build erstellt und deployed werden.

### Protokoll Client Server

Folgende Diagramme beschreiben die Kommunikation zwischen Clients und Server. Client X ist jeweils ein spezifischer
Client, Other Clients beschreibt eine beliebige Anzahl anderer Clients.

Nachrichten und deren Aufbau können [im common Ordner](client/src/common) gefunden werden.

#### Chat

Jederzeit kann ein User etwas in den Chat schreiben. Für die Spiellogik müssen die Interaktionen jedoch als solche
markiert werden. Diese Logik passiert auf dem Client. Somit werden die Nachrichten entweder als entsprechende
Interaktion gesendet oder als Chat.

Der Server wertet die Interaktionen gemäss dem Spielablauf aus, Chat-Nachrichten werden an alle (auch den Sender) im
Raum gebroadcasted.

#### Join & Leave

```mermaid
    sequenceDiagram
        autonumber
        participant s as Server
        participant c1 as Client X
        participant c2 as Other Clients
        activate c1
        c1->>+s: JOIN_ROOM {id}
        s->>+c1: CHAT_ANNOUNCEMENT {Welcome}
        c1-->>c2: "The ID is {id}"
        activate c2
        c2->>s: JOIN_ROOM {id}
        s->>+c1: CHAT_ANNOUNCEMENT {Welcome}
        
        s -> c2: GAME_SETUP
        loop Game
            c1 ->> s : GAME_QUESTION
            s ->> c2 : GAME_STATE
            loop Expect all answers
               c2 ->> s: GAME_VOTE
               s ->> c2: GAME_STATE
            end
            s ->> c2: CHAT_ANNOUNCEMENT {Results}
        end

        c2 ->> s : LEAVE_ROOM {id}
        deactivate c2
        c1 ->>s : LEAVE_ROOM {id}

        deactivate c1
        deactivate s
```

#### Game loop, Serverseitig

```mermaid
graph TB
    1[Communicate persona's expect own] -->
    2[Communicate 0rder] -->
    3[Expect question from the one on turn] --> 4[Communicate question, start timer, expect all votes or timer end];
    5 -->|Yes| 6{Solution question?};
    6 -->|Yes| 8[End game];
    6 & 5-->|No| 7[Next player] --> 3;
    4 --> 5{The majority voted for} ;    



```

### Frameworks

Exact packages and versions can be found in the [server package.json](./package.json) and
the [client package.json](client/package.json).

#### Server dependencies

1. `express`:   this is the node web server
2. `socket.io`: this framework wraps websockets for us, here the socket.io server
3. `nodemon`:   the node demon is used for automatic rebuilds on changes during development

#### Client dependencies

1. `react`: the framework the client is written in
2. `bootstrap`: css framework for low effort good behaviour
3. `react-bootstarp`: bootstrap styled html as react components
4. `react-dom`, `react-scripts`, `web-vitals`:  react boilerplate from `create-react-app`
5. `react-router-dom`:  utility for routing and navigation inside the app
6. `socket.io-client`: client implementation to connect to the socket.io server
