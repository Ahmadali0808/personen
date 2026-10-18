// pages/index.js
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [persons, setPersons] = useState([]);
  const [sortField, setSortField] = useState('Achternaam');
  const [order, setOrder] = useState('asc');
  const [loading, setLoading] = useState(true);

  async function fetchList() {
    setLoading(true);
    const res = await fetch(`/api/personen?sortField=${sortField}&order=${order}`);
    const data = await res.json();
    setPersons(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchList();
  }, [sortField, order]);

  async function handleDelete(id) {
    if (!confirm('Weet je zeker dat je deze persoon wilt verwijderen?')) return;
    const res = await fetch(`/api/personen/${id}`, { method: 'DELETE' });
    if (res.status === 204) {
      setPersons(persons.filter(p => p.Id !== id));
    } else {
      alert('Kon niet verwijderen');
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Personen</h1>
      <Link href="/add">+ Nieuwe persoon</Link>
      <div style={{ marginTop: 12 }}>
        Sorteer op:
        <button onClick={() => { setSortField('Achternaam'); setOrder(order === 'asc' ? 'desc' : 'asc'); }}>
          Achternaam {sortField === 'Achternaam' ? (order === 'asc' ? '↑' : '↓') : ''}
        </button>{' '}
        <button onClick={() => { setSortField('Woonplaats'); setOrder(order === 'asc' ? 'desc' : 'asc'); }}>
          Woonplaats {sortField === 'Woonplaats' ? (order === 'asc' ? '↑' : '↓') : ''}
        </button>
      </div>

      {loading ? <p>Laden...</p> : (
        <table border="1" cellPadding="8" style={{ marginTop: 12, borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>Naam</th>
              <th>Straat</th>
              <th>Postcode</th>
              <th>Woonplaats</th>
              <th>Telefoon</th>
              <th>Acties</th>
              <th>Tijd toegevoegd (hover)</th>
            </tr>
          </thead>
          <tbody>
            {persons.map(p => (
              <tr key={p.Id}>
                <td>
                  <Link href={`/edit/${p.Id}`}>{p.Voornaam} {p.Achternaam}</Link>
                </td>
                <td>{p.Straat} {p.Huisnummer}</td>
                <td>{p.Postcode}</td>
                <td>{p.Woonplaats}</td>
                <td>{p.Telefoonnummer}</td>
                <td>
                  <Link href={`/edit/${p.Id}`}>Wijzig</Link>{' '}
                  |{' '}
                  <a href="#" onClick={(e) => { e.preventDefault(); handleDelete(p.Id); }}>Verwijder</a>
                </td>
                <td>
                  <HoverTimestamp ts={p.TijdToegevoegd} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function HoverTimestamp({ ts }) {
  const [show, setShow] = useState(false);
  return (
    <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {show ? <small>{new Date(ts).toLocaleString()}</small> : <small style={{ color: '#999' }}>hover</small>}
    </div>
  );
}
