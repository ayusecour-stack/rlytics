// Affiche la dernière version publiée (numéro, taille, date) à côté des boutons de téléchargement
(async () => {
  try {
    const res = await fetch('https://api.github.com/repos/ayusecour-stack/rlytics/releases/latest', { headers: { Accept: 'application/vnd.github+json' } });
    if (!res.ok) return;
    const r = await res.json();
    const exe = (r.assets || []).find((a) => /\.exe$/i.test(a.name));
    const parts = [`Version ${String(r.tag_name || '').replace(/^v/, '')}`];
    if (exe) parts.push(`${Math.round(exe.size / 1048576)} Mo`);
    if (r.published_at) parts.push(new Date(r.published_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }));
    parts.push('Windows 10 / 11');
    const text = parts.join(' · ');
    for (const id of ['dl-meta', 'dl-meta-2']) { const el = document.getElementById(id); if (el) el.textContent = text; }
  } catch { /* hors ligne : le texte par défaut reste */ }
})();
