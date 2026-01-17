const files = Array.from({ length: 20 }, (_, i) => `words-${i + 1}.json`);

async function loadAll() {
  const all = [];

  for (const file of files) {
    try {
      const res = await fetch(file);
      const json = await res.json();
      all.push(...json);
    } catch (err) {
      console.error("Error loading", file, err);
    }
  }

  return all;
}

loadAll().then(entries => {
  console.log("Loaded entries:", entries.length);

  const search = document.getElementById("search");
  const results = document.getElementById("results");

  search.addEventListener("input", () => {
    const q = search.value.trim();
    results.innerHTML = "";

    if (!q) return;

    const filtered = entries.filter(e =>
      e.word.includes(q) || e.meaning.includes(q)
    );

    filtered.forEach(e => {
      const div = document.createElement("div");
      div.textContent = `${e.word} — ${e.meaning}`;
      results.appendChild(div);
    });
  });
});
