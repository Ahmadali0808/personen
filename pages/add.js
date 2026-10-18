// pages/add.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function AddPage() {
  const [form, setForm] = useState({
    Voornaam: '', Achternaam: '', Straat: '', Huisnummer: '', Postcode: '', Woonplaats: '', Telefoonnummer: ''
  });
  const router = useRouter();

  function onChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const res = await fetch('/api/personen', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push('/');
    } else {
      alert('Kon niet toevoegen');
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Nieuwe persoon toevoegen</h1>
      <form onSubmit={onSubmit}>
        <div><label>Voornaam: <input name="Voornaam" value={form.Voornaam} onChange={onChange} /></label></div>
        <div><label>Achternaam: <input name="Achternaam" value={form.Achternaam} onChange={onChange} /></label></div>
        <div><label>Straat: <input name="Straat" value={form.Straat} onChange={onChange} /></label></div>
        <div><label>Huisnummer: <input name="Huisnummer" value={form.Huisnummer} onChange={onChange} /></label></div>
        <div><label>Postcode: <input name="Postcode" value={form.Postcode} onChange={onChange} /></label></div>
        <div><label>Woonplaats: <input name="Woonplaats" value={form.Woonplaats} onChange={onChange} /></label></div>
        <div><label>Telefoonnummer: <input name="Telefoonnummer" value={form.Telefoonnummer} onChange={onChange} /></label></div>
        <div style={{ marginTop: 8 }}>
          <button type="submit">Opslaan</button>{' '}
          <Link href="/">Annuleren</Link>
        </div>
      </form>
    </div>
  );
}
