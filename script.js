// ===============================
// Load all JSON dictionary files
// ===============================
async function loadAll() {
  const files = [
    "words-1.json", "words-2.json", "words-3.json", "words-4.json",
    "words-5.json", "words-6.json", "words-7.json", "words-8.json",
    "words-9.json", "words-10.json", "words-11.json", "words-12.json",
    "words-13.json", "words-14.json", "words-15.json", "words-16.json",
    "words-17.json", "words-18.json", "words-19.json", "words-20.json"
  ];

  let all = [];

  for (const file of files) {
    try {
      const res = await fetch(file);
      const data = await res.json();
      all = all.concat(data);
    } catch (err) {
      console.error("Error loading", file, err);
    }
  }

  return all;
}

// ===============================
// Main logic
// ===============================
loadAll().then(rawEntries => {
  // Deduplicate
  const seen = new Set();
  const entries = [];

  rawEntries.forEach(e => {
    const key = `${e.arabic}::${(e.english || []).join(",")}`;
    if (!seen.has(key)) {
      seen.add(key);
      entries.push(e);
    }
  });

  console.log("Dictionary loaded:", entries.length, "unique entries");

  const searchInput = document.getElementById("search");
  const resultsDiv = document.getElementById("results");

  // ===============================
  // Search function
  // ===============================
  function search(query) {
    query = query.trim().toLowerCase();
    resultsDiv.innerHTML = "";

    if (query === "") return;

    const results = entries.filter(e =>
      e.arabic.includes(query) ||
      (e.english && e.english.some(en => en.toLowerCase().includes(query)))
    );

    if (results.length === 0) {
      resultsDiv.innerHTML = `<p class="no-results">No results found.</p>`;
      return;
    }

    results.forEach(e => {
      const englishList = e.english ? e.english.join(", ") : "No translation";
      const item = document.createElement("div");
      item.className = "result-item";
      item.innerHTML = `
        <p class="arabic-word">${e.arabic}</p>
        <p class="english-word">${englishList}</p>
      `;
      resultsDiv.appendChild(item);
    });
  }

  // ===============================
  // Input listener
  // ===============================
  searchInput.addEventListener("input", () => {
    search(searchInput.value);
  });

});

// ===============================
// SECRET EASTER EGG (5 clicks)
// ===============================
let secretClicks = 0;

document.getElementById("title").addEventListener("click", () => {
  secretClicks++;

  if (secretClicks === 5) {
    alert("🎉 You discovered the secret message! 🎉");
    secretClicks = 0; // reset
  }
});
