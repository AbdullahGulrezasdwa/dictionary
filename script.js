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
  console.log("Dictionary loaded:", entries.length, "entries");

  const search = document.getElementById("search");
  const results = document.getElementById("results");

  search.addEventListener("input", () => {
    const q = search.value.trim().toLowerCase();
    results.innerHTML = "";

    if (!q) return;

    const filtered = entries.filter(e => {
      const arabic = e.arabic?.toLowerCase() || "";
      const english = (e.english || []).join(" ").toLowerCase();

      return arabic.includes(q) || english.includes(q);
    });

    filtered.forEach(e => {
      const div = document.createElement("div");
      div.textContent = `${e.arabic} — ${e.english.join(", ")}`;
      results.appendChild(div);
    });
  });
});
