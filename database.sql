-- Maak de database en de tabel voor de Personen-app
CREATE DATABASE IF NOT EXISTS personen;
USE personen;

CREATE TABLE IF NOT EXISTS Personen (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  Voornaam VARCHAR(50) NOT NULL,
  Achternaam VARCHAR(50) NOT NULL,
  Straat VARCHAR(100),
  Huisnummer VARCHAR(10),
  Postcode VARCHAR(10),
  Woonplaats VARCHAR(50),
  Telefoonnummer VARCHAR(20),
  TijdToegevoegd TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Personen (Voornaam, Achternaam, Straat, Huisnummer, Postcode, Woonplaats, Telefoonnummer) VALUES
('Jan', 'Jansen', 'Hoofdstraat', '1', '9401 AA', 'Assen', '0612345678'),
('Fatima', 'de Vries', 'Kerkplein', '12', '7811 BB', 'Emmen', '0687654321');
