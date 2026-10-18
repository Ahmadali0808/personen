import { getPool } from '../../../lib/db.js';

export default async function handler(req, res) {
  const pool = await getPool();

  if (req.method === 'GET') {
    // optioneel sort param: sortField=Achternaam of Woonplaats
    const sortField = req.query.sortField === 'Woonplaats' ? 'Woonplaats' : 'Achternaam';
    const order = req.query.order === 'desc' ? 'DESC' : 'ASC';
    try {
      const [rows] = await pool.query(`SELECT * FROM Personen ORDER BY ${mysqlSafe(sortField)} ${order}`);
      res.status(200).json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'DB error' });
    }
    return;
  }

  if (req.method === 'POST') {
    const { Voornaam, Achternaam, Straat, Huisnummer, Postcode, Woonplaats, Telefoonnummer } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO Personen (Voornaam, Achternaam, Straat, Huisnummer, Postcode, Woonplaats, Telefoonnummer) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [Voornaam, Achternaam, Straat, Huisnummer, Postcode, Woonplaats, Telefoonnummer]
      );
      const insertId = result.insertId;
      const [rows] = await pool.query('SELECT * FROM Personen WHERE Id = ?', [insertId]);
      res.status(201).json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'DB insert error' });
    }
    return;
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

// helper to avoid injection on column name (we only allow two safe values)
function mysqlSafe(field) {
  if (field === 'Woonplaats') return 'Woonplaats';
  return 'Achternaam';
}