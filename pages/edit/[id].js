// pages/edit/[id].js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function EditPage() {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/personen/${id}`).then(r => r.json()).then(data => setForm(data));
  }, [id]);

  if (!form) return <div>laden...</div>;

  function onChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSave(e) {
    e.preventDefault();
    const res = await fetch(`/api/personen/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push('/');
    } else {
      alert('Kon niet opslaan');
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Persoon bewerken</h1>
      <form onSubmit={onSave}>
        <div><label>Voornaam: <input name="Voornaam" value={form.Voornaam || ''} onChange={onChange} /></label></div>
        <div><label>Achternaam: <input name="Achternaam" value={form.Achternaam || ''} onChange={onChange} /></label></div>
        <div><label>Straat: <input name="Straat" value={form.Straat || ''} onChange={onChange} /></label></div>
        <div><label>Huisnummer: <input name="Huisnummer" value={form.Huisnummer || ''} onChange={onChange} /></label></div>
        <div><label>Postcode: <input name="Postcode" value={form.Postcode || ''} onChange={onChange} /></label></div>
        <div><label>Woonplaats: <input name="Woonplaats" value={form.Woonplaats || ''} onChange={onChange} /></label></div>
        <div><label>Telefoonnummer: <input name="Telefoonnummer" value={form.Telefoonnummer || ''} onChange={onChange} /></label></div>
        <div style={{ marginTop: 8 }}>
          <button type="submit">Opslaan</button>{' '}
          <Link href="/">Terug</Link>
        </div>
      </form>
      <div style={{ marginTop: 12 }}>
        <small>Tijd toegevoegd: {new Date(form.TijdToegevoegd).toLocaleString()}</small>
      </div>
    </div>
  );
}
