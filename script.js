let data = [];
let seen = new Set();

const files = [
  'words-1.json','words-2.json','words-3.json','words-4.json','words-5.json',
  'words-6.json','words-7.json','words-8.json','words-9.json','words-10.json',
  'words-11.json','words-12.json','words-13.json','words-14.json','words-15.json',
  'words-16.json','words-17.json','words-18.json','words-19.json','words-20.json'
];

Promise.all(files.map(file => fetch(file).then(r => r.json())))
  .then(all => {
    all.forEach(list => {
      list.forEach(entry => {
        const key = entry.arabic + "|" + entry.english.join(",");
        if (!seen.has(key)) {
          seen.add(key);
          data.push(entry);
        }
      });
    });

    console.log("Dictionary loaded:", data.length, "unique entries");
  })
  .catch(err => console.error("Error loading dictionary:", err));
