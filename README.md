# ![Who Am I](client/src/img/logo.png) <br/> WebE, Web Engineering 
**INF-P-WT002, BE-Sa-1, HS21/22, FFHS Bern** \
*unter der Leitung von Dr. Heinrich Zimmermann* \
*eingereicht von Ramona Koksa | Yves Bastian Pellaton*
***
## Inhalt

[[_TOC_]]

## Einführung
> «A game is a series of interesting choices.» – Sid Meier

Im Rahmen des Moduls Web Engineering (WebE) haben wir den Auftrag erhalten, ein Spiel zu entwickeln. Die Rahmenbedingungen werden durch das Modul vorgegeben und werden aus dem Dokument «Projektarbeit_WebE-Beschreibung» entnommen.

## Spielregeln
Das Spiel «Who Am I» ist ein Ratespiel, bei dem zwei oder mehr Spieler eine Person verkörpern und raten müssen wer sie sind. Es dürfen nur Fragen, die mit «Ja» oder «Nein» beantwortet werden können (geschlossene Fragen) gestellt werden. Werden die Fragen mit «Ja» beantwortet, dürfen weitere Fragen gestellt werden. Wenn nicht, dann ist der nächste Spieler dran. Ziel ist es möglichst schnell zu erraten, wen man verkörpert.

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
1. (Bei Grossem Aufwand oder Impact) Der Issue wird diskutiert und mit ~"status::todo" als beriet für die Entwicklung markiert
1. Der Issue wird assigend und wenn begonnen wird mit ~"status::progress" markiert. Es wird aus [dev](https://git.ffhs.ch/ramona.koksa/whoami/-/tree/dev) ein neuer branch erstellt. Es kann bereits ein merge-request erstellt werden, dieser sollte aber als `DRAFT:` makiert sein.
1. Mit `/spend` kann die verwendete Zeit getrackt werden.
1. Ist der Code ready, wird ein merge-request erstellt oder beim bestehenden die `DRAFT:` markierung entfernt. Der merge-request ist mit dem issue zu verknüpfen: `Resolves #9` sollte reichen. Es ist sicherzustellen, dass der branch auf dev rebased ist und die History sauber ist.
1. Die andere Person assignen und das label ~"status::review" setzen.
1. Die andere Person reviewt die Arbeit, gibt Feedback und fordert die Definition of Done ein. Ist sie glücklich merget sie nach dev.

### Definition of Done
- Die verwendeten Bibliotheken (Libraries) werden dokumentiert
- Beschreibung der Funktionalität erstellt
- Struktur des Programms dokumentiert
- Entsprechende Userdokumentation erstellt
- Testbare Funktionalität getestet
- Peer reviewed
***

## Anforderungen
Sämtliche Anforderungen (funktional- und nicht-funktional) werden im vorliegenden Repository unter [issues](https://git.ffhs.ch/ramona.koksa/whoami/-/issues) beschrieben. Die User Stories werden mit dem Label ~user-story versehen.
Einen ersten Überblick verschaffen die nachfolgenden Wireframes.

![img.png](client/src/img/login-wireframe.png)
![img.png](client/src/img/game.png)

## Protokoll Client Server
TBD #5
