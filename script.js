// ===============================
// Load all dictionary JSON files
// ===============================

let data = [];

// List of dictionary files
const files = [
  'words-1.json','words-2.json','words-3.json','words-4.json','words-5.json',
  'words-6.json','words-7.json','words-8.json','words-9.json','words-10.json',
  'words-11.json','words-12.json','words-13.json','words-14.json','words-15.json',
  'words-16.json','words-17.json','words-18.json','words-19.json','words-20.json'
];

// Load all files and merge into one array
Promise.all(files.map(file => fetch(file).then(r => r.json())))
  .then(all => {
    all.forEach(list => data.push(...list));
    console.log("Dictionary loaded:", data.length, "entries");
  })
  .catch(err => console.error("Error loading dictionary:", err));


// ===============================
// Normalize Arabic text
// ===============================

function normalizeArabic(text) {
  return text
    .replace(/أ|إ|آ/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي");
}


// ===============================
// Search Function
// ===============================

function searchWord() {
  const query = document.getElementById("search").value.trim();
  const direction = document.getElementById("direction").value;

  if (query === "") {
    document.getElementById("result").innerHTML = "";
    return;
  }

  const normalizedQuery = normalizeArabic(query);

  let results = [];

  if (direction === "ar-en") {
    // Arabic → English
    results = data.filter(entry => {
      const normalizedArabic = normalizeArabic(entry.arabic);
      return normalizedArabic.includes(normalizedQuery);
    });
  } else {
    // English → Arabic
    results = data.filter(entry =>
      entry.english.some(e => e.toLowerCase().includes(query.toLowerCase()))
    );
  }

  // Display results
  if (results.length === 0) {
    document.getElementById("result").innerHTML = "<p>No results found.</p>";
    return;
  }

  let html = "";
  results.forEach(entry => {
    html += `
      <div class="word-box">
        <p><strong>${entry.arabic}</strong> — ${entry.english.join(", ")}</p>
      </div>
    `;
  });

  document.getElementById("result").innerHTML = html;
}


// ===============================
// Trigger search on typing
// ===============================

document.getElementById("search").addEventListener("input", searchWord);
document.getElementById("direction").addEventListener("change", searchWord);
