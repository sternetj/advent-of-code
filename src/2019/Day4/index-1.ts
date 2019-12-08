const lower = 168630;
const higher = 718098;

let matching = 0;

for (let i = lower; lower <= higher; i++) {
  const key = `${i}`;
  if (!/(11|22|33|44|55|66|77|88|99|00)/.test(key)) continue;

  const inOrder =
    key
      .split("")
      .sort()
      .join("") === key;
  if (!inOrder) continue;

  matching++;
}

console.log(matching);
