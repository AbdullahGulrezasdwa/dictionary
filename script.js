let data = [];

// Load dictionary
fetch('dictionary.json')
  .then(response => response.json())
  .then(json => data = json);

// Normalize Arabic text
function normalizeArabic(text) {
  return text
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/[ًٌٍَُِّ]/g, "") // remove tashkeel
    .trim()
    .toLowerCase();
}

document.getElementById('search').addEventListener('input', function () {
  let input = normalizeArabic(this.value);
  let direction = document.getElementById('direction').value;
  let result = document.getElementById('result');
  result.innerHTML = "";

  if (input === "") return;

  for (let word of data) {
    let ar = normalizeArabic(word.arabic);
    let en = word.english.toLowerCase();

    if (direction === "ar-en" && ar === input) {
      result.innerHTML = `${word.arabic} — ${word.english}`;
      return;
    }

    if (direction === "en-ar" && en === input) {
      result.innerHTML = `${word.english} — ${word.arabic}`;
      return;
    }
  }

  result.innerHTML = "Not found";
});
