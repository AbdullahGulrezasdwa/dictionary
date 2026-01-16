let data = [];

fetch('dictionary.json')
  .then(response => response.json())
  .then(json => data = json);

document.getElementById('search').addEventListener('input', function () {
  let input = this.value.toLowerCase().trim();
  let direction = document.getElementById('direction').value;
  let result = document.getElementById('result');
  result.innerHTML = "";

  if (input === "") return;

  for (let word of data) {
    if (direction === "ar-en" && word.arabic === input) {
      result.innerHTML = `${word.arabic} — ${word.english}`;
      return;
    }
    if (direction === "en-ar" && word.english.toLowerCase() === input) {
      result.innerHTML = `${word.english} — ${word.arabic}`;
      return;
    }
  }

  result.innerHTML = "Not found";
});
