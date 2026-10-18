# Personen – adresboek in Next.js

Een webapp om personen bij te houden (naam, adres, telefoonnummer). Gebouwd met **Next.js (React)** en een **MySQL**-database.

## Functies
- Overzicht van alle personen in een tabel
- **Sorteren** op achternaam of woonplaats (oplopend/aflopend)
- Persoon **toevoegen**, **wijzigen** en **verwijderen** (met bevestiging)
- Tijd van toevoegen zichtbaar als je met de muis over de rij gaat

## Hoe het werkt
De pagina's (React) praten met een eigen **REST API** in Next.js, en de API praat met MySQL.

| Methode | Route | Wat het doet |
|---|---|---|
| GET | `/api/personen?sortField=Achternaam&order=asc` | Alle personen ophalen (gesorteerd) |
| POST | `/api/personen` | Nieuwe persoon toevoegen |
| GET | `/api/personen/[id]` | Eén persoon ophalen |
| PUT | `/api/personen/[id]` | Persoon wijzigen |
| DELETE | `/api/personen/[id]` | Persoon verwijderen |

Alle queries gebruiken **prepared statements** (`?`-parameters) tegen SQL-injectie. De sorteerkolom wordt gecontroleerd, zodat alleen `Achternaam` of `Woonplaats` mogelijk is.

## Projectstructuur
```
pages/index.js                 Overzicht + sorteren + verwijderen
pages/add.js                   Formulier: persoon toevoegen
pages/edit/[id].js             Formulier: persoon wijzigen
pages/api/personen/index.js    API: lijst ophalen en toevoegen
pages/api/personen/[id].js     API: ophalen, wijzigen, verwijderen
lib/db.js                      MySQL-verbinding (connection pool)
database.sql                   Database + tabel + voorbeelddata
```

## Starten
1. Start MySQL (bijvoorbeeld via XAMPP)
2. Voer `database.sql` uit in phpMyAdmin
3. Kopieer `.env.example` naar `.env.local` en vul je databasegegevens in
4. Voer uit:
```
npm install
npm run dev
```
5. Open http://localhost:3000

## Gebruikte technieken
Next.js · React (useState, useEffect) · REST API · MySQL (mysql2) · JavaScript

## Wat ik heb geleerd
- Een volledige CRUD-app bouwen met front-end en back-end in één project
- Een eigen API maken met Next.js API routes
- Veilig met een database werken via prepared statements en environment variables
