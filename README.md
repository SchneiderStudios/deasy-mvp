# DEASY — MVP

KI-Assistent für Bürokratie in Deutschland. Landingpage + Bürokratie-Check-Quiz +
echte KI-Dokumentanalyse (über Claude), als schlankes MVP ohne Framework —
ein statisches `index.html` plus eine einzige Serverless Function.

## Projektstruktur

```
deasy-app/
├── index.html          ← komplette Landingpage (Quiz, Analyse-Demo, Login-Modal)
├── api/
│   └── analyze.js      ← Serverless Function: hält den API-Key geheim, ruft Anthropic auf
├── vercel.json          ← sorgt dafür, dass index.html als Startseite ausgeliefert wird
├── package.json
└── .env.example
```

Kein Next.js, kein Build-Schritt — Vercel erkennt `/api/*.js`-Dateien automatisch
als Functions, auch ohne Framework ("Other" Projekt-Typ).

## In 10 Minuten live — Schritt für Schritt

### 1. Code auf GitHub bringen

```bash
cd deasy-app
git init
git add .
git commit -m "DEASY MVP: Landingpage + Bürokratie Check + KI-Dokumentanalyse"
```

Dann auf [github.com](https://github.com) ein neues, leeres Repository anlegen
(z. B. `deasy-mvp`) und pushen:

```bash
git remote add origin https://github.com/<dein-username>/deasy-mvp.git
git branch -M main
git push -u origin main
```

### 2. Bei Vercel deployen

1. Auf [vercel.com](https://vercel.com) mit dem GitHub-Account anmelden
2. "Add New… → Project" → das `deasy-mvp`-Repo auswählen → "Import"
3. Vercel erkennt automatisch "Other" als Framework — nichts umstellen, einfach "Deploy" klicken
4. **Wichtig, bevor der erste echte Test läuft:** Project Settings → Environment
   Variables → `ANTHROPIC_API_KEY` mit deinem echten Anthropic-API-Key eintragen
   (aus der [Anthropic Console](https://console.anthropic.com)), dann rechts oben
   "Redeploy" klicken, damit die Variable aktiv wird
5. Fertig — die von Vercel vergebene `.vercel.app`-URL ist live und mit echten
   Nutzern teilbar

### 3. Danach bei jeder Änderung

```bash
git add .
git commit -m "Beschreibung der Änderung"
git push
```

Vercel deployt automatisch bei jedem Push auf `main` neu — kein manueller Schritt mehr nötig.

## Konkurrenz-Update (dieser Durchgang)

Der Markt hat sich weiter verschärft — wichtig für die Priorisierung:
- **Klar** (offener Code, github.com/aircode610/Klar) hat bereits Risk-Scoring, RAG-gestützte
  Antworten (grounded in echtem Recht), Formular-Autofill, Antwortentwurf, Kalender, Archiv,
  Offline-PWA, 6 Sprachen inkl. RTL — funktional deutlich weiter als dieses MVP
- **buergerchat** (offener Code) löst explizit das Problem veralteter Beträge: wöchentlicher
  Re-Crawl offizieller Quellen, weil sich z. B. Kindergeld jährlich ändert
- **Der deutsche Staat selbst** baut eine KI-gestützte "Germany App" (Pilot ab 1.7.2026 in vier
  Bundesländern, mit Telekom/SAP) — reine Brief-Erklärung wird mittelfristig eine kostenlose
  Regierungsfunktion
- **Bureaucracy Buddy** ist im App Store live mit Scam-Detector, Incognito-Modus, Offline-Modus

**Was das für die Priorität bedeutet:** Einzelbrief-Erklärung wird noch stärker zur Commodity,
das Fall-übergreifende Tracking (bereits als Kern-Differenzierung festgelegt) wird noch wichtiger.

## Was in diesem Durchgang verbessert wurde (aktuellster Stand)

- **"Meine Fälle" — echtes Fall-übergreifendes Tracking, zum ersten Mal tatsächlich im Produkt
  sichtbar, nicht nur im Pricing-Text.** Nach jeder Analyse kann das Dokument einem Fall
  zugeordnet werden (z. B. "Jobcenter", "Finanzamt"). Eine neue "Meine Fälle"-Ansicht (Menüpunkt)
  zeigt pro Fall alle zugeordneten Dokumente, sortiert mit der jeweils dringendsten offenen
  Aufgabe oben. Läuft aktuell über `localStorage` (pro Gerät/Browser, keine Cloud-Synchronisation)
  — bewusst so gelöst, um das Kernkonzept ohne Account-System schon jetzt erlebbar zu machen.
  Sobald echte Nutzerkonten existieren, wandert diese Logik 1:1 in die Datenbank; die Datenstruktur
  (`{caseName: [{document_type, summary, tasks, confidence, date}]}`) ist bereits so geschnitten,
  dass sie sich leicht in eine `cases`/`case_documents`-Tabelle übersetzen lässt
- **Antwortentwurf direkt im Analyse-Ergebnis** — die KI schlägt jetzt (wenn ein Brief das
  hergibt) einen kurzen Antworttext auf Behördendeutsch vor, mit Ein-Klick-Kopieren
- **Warnhinweis bei zeitkritischen Beträgen** — wenn ein Brief Summen nennt, die sich
  regelmäßig ändern (Kindergeld, Bürgergeld etc.), zeigt DEASY jetzt einen expliziten Hinweis

## Was in einem früheren Durchgang verbessert wurde

- **Datei- und Größenvalidierung** beim Upload (nur PDF/JPG/PNG/WEBP/GIF, max. 10 MB) — clientseitig und serverseitig
- **Timeout (45 s)** für die KI-Analyse, damit der Spinner nicht endlos läuft
- **Rudimentäres Rate-Limiting** pro IP in `api/analyze.js` (15 Anfragen / 10 Minuten) —
  schützt provisorisch vor versehentlichem Missbrauch deines API-Keys. Für echten Launch-Traffic
  durch eine robuste Lösung ersetzen (z. B. Upstash Redis oder Vercel KV), da der In-Memory-Zähler
  bei jeder neuen Serverless-Instanz zurückgesetzt wird
- **Datenschutzhinweis** direkt in der Upload-Zone (was mit dem Dokument passiert)
- **Meta-Tags & Favicon** für saubere Link-Vorschauen, wenn du die URL teilst
- **Impressum & Datenschutzerklärung** als Platzhalterseiten — in Deutschland ist ein Impressum
  für jede geschäftliche Website gesetzlich vorgeschrieben (§ 5 TMG). **Bitte vor dem echten
  Launch mit echten Angaben füllen und die Datenschutzerklärung von einem Anwalt/einer Anwältin
  prüfen lassen** — Vorlagen sind kein Ersatz für echte Rechtsberatung, gerade weil DEASY
  potenziell sensible Dokumente verarbeitet
- **Einfaches Analytics-Grundgerüst** (`track()` in index.html, sendet an `window.dataLayer`) —
  erfasst bereits die Funnel-Events aus eurer ursprünglichen Konzeption: `landing_view`,
  `check_started`, `check_completed`, `document_uploaded`, `document_analysis_completed`,
  `paywall_viewed`, `checkout_started`. Aktuell landen die Events nur in der Konsole (bei
  `?debug=1` in der URL) — sobald ihr ein Tool wie Plausible, PostHog oder Google Tag Manager
  anbindet, docken die Events automatisch an, ohne den Code hier anzufassen
- **Barrierefreiheit der Modals**: `role="dialog"`, Fokus wandert beim Öffnen ins Modal und beim
  Schließen zurück zum auslösenden Element, Tab-Taste bleibt innerhalb des Modals gefangen
  (Focus-Trap), Screenreader bekommen Ergebnisse über `aria-live` mit
- **Mobile-Fix für die Hero-Illustration** — lief auf sehr schmalen Bildschirmen (<480px) teilweise aus dem sichtbaren Bereich heraus

## Bekannte Grenzen, die als Nächstes drankommen sollten

- Rate-Limiting ist provisorisch (siehe oben) — vor nennenswertem Traffic durch etwas Robusteres ersetzen
- Kein echter Auftragsverarbeitungsvertrag (AVV) mit Anthropic dokumentiert — für den Datenschutz-Text nachholen
- Noch keine echten Nutzerkonten, keine Zahlungen, kein Fälle-Tracking (siehe unten)
- Die Tarif-Buttons auf der Preise-Sektion öffnen aktuell noch den Bürokratie-Check statt eines
  echten Checkout-Flows — sobald ein Stripe Payment Link steht, hier verlinken

## Entschiedene Architektur-Fragen (Stand dieser Version)

- **Pricing: Hybrid statt Drei-Stufen-Abo.** Einzel-Check (2,90€/Dokument) für ein einzelnes
  Schreiben, "Fall-Tracking" (9,90€/Monat) für mehrere zusammenhängende Dokumente. Das war schon
  vorher als Richtung festgelegt — die Seite spiegelt es jetzt auch wider. Die Dokument-Analyse im
  aktuellen MVP ist trotzdem noch ohne echte Bezahlschranke frei nutzbar (kein Stripe-Check vor
  der Analyse) — das kommt erst, wenn ein echter Checkout steht.
- **Dokumentanalyse: bewusst weiterhin komplett über LLM, keine Keyword-Vorklassifikation.**
  Einfacher, schon im Betrieb, und für die Validierungsphase (wenige Nutzer, MVP) ist die höhere
  Kosten-pro-Analyse kein echtes Problem. Sobald echter Traffic kommt und Kosten/Latenz spürbar
  werden, lohnt sich der Wechsel auf eine deterministische Vorklassifikation (wie ursprünglich
  am BriefKlar-Vorbild überlegt) — bewusst als spätere Optimierung zurückgestellt, nicht vergessen.

## Was hier bewusst NICHT drin ist (nächste Schritte, nicht jetzt)

- Echte Nutzerkonten/Login (aktuell nur UI-Demo mit Client-seitiger Validierung)
- Zahlungen (siehe Vorschlag: Stripe Payment Link statt eigener Billing-Logik)
- Datenbank/Fälle-Tracking (erst sinnvoll, sobald das Grundprodukt validiert ist)

Bewusst schlank gehalten, um so schnell wie möglich mit echten Nutzern zu testen,
bevor mehr Infrastruktur gebaut wird.
