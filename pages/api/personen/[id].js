// pages/api/personen/[id].js
import { getPool } from '../../../lib/db.js';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;
  const pool = await getPool();

  if (method === 'GET') {
    try {
      const [rows] = await pool.query('SELECT * FROM Personen WHERE Id = ?', [id]);
      if (!rows.length) return res.status(404).json({ error: 'Not found' });
      res.status(200).json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'DB error' });
    }
    return;
  }

  if (method === 'PUT') {
    const { Voornaam, Achternaam, Straat, Huisnummer, Postcode, Woonplaats, Telefoonnummer } = req.body;
    try {
      await pool.query(
        'UPDATE Personen SET Voornaam=?, Achternaam=?, Straat=?, Huisnummer=?, Postcode=?, Woonplaats=?, Telefoonnummer=? WHERE Id=?',
        [Voornaam, Achternaam, Straat, Huisnummer, Postcode, Woonplaats, Telefoonnummer, id]
      );
      const [rows] = await pool.query('SELECT * FROM Personen WHERE Id = ?', [id]);
      res.status(200).json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'DB update error' });
    }
    return;
  }

  if (method === 'DELETE') {
    try {
      await pool.query('DELETE FROM Personen WHERE Id = ?', [id]);
      res.status(204).end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'DB delete error' });
    }
    return;
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${method} Not Allowed`);
}
