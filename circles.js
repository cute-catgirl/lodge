import { config } from "./logiverse.js";
import { getHexFromSplash } from "./splash.js";

const DOMfeed = document.getElementById("feed-grid");

let DATE_OFFSET = new Date().getTimezoneOffset() * 60000;

const units = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
};

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

function getRelativeTime(d1, d2 = new Date()) {
  let elapsed = d1 - d2;

  for (var u in units)
    if (Math.abs(elapsed) > units[u] || u == "second")
      return rtf.format(Math.round(elapsed / units[u]), u);
}

// from MDN web docs :3
function getRandomInt(min, max, rng) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(rng * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

async function loadFeed() {
  let posts = [];
  const instances = await Promise.all(
    config.instances.map(({ endpoints, name }) =>
      fetch(endpoints.feed)
        .then((res) => res.json())
        .catch(() => [])
        .then((feed) => ({ name, feed }))
    )
  );

  for (let instance of instances) {
    if (!Array.isArray(instance.feed)) continue;
    for (let post of instance.feed) {
      if (
        typeof post[0] === "string" &&
        typeof post[1] === "string" &&
        new Date(post[2]).getTime()
      )
        posts.push({
          content: post[0],
          author: post[1],
          date: new Date(new Date(post[2]) - DATE_OFFSET),
          gif: post[3] || "",
          instance: instance.name,
        });
    }
  }
  posts = posts.sort((a, b) => b.date - a.date);
  return posts;
}

function updateUI(posts) {
  for (let post of posts) {
    let newPostDiv = createPostHTML(post);
    DOMfeed.appendChild(newPostDiv);
  }
}

function createPostHTML(post) {
  // Create the circle
  let postDiv = document.createElement("div");
  postDiv.className = "circle";
  var rng = new Math.seedrandom(post.content);
  let red = getRandomInt(0,9, rng());
  let green = getRandomInt(0,9, rng());
  let blue = getRandomInt(0,9, rng());
  postDiv.style.backgroundColor = getHexFromSplash(`${red}${green}${blue}`);
  // Give it the text
  postDiv.ariaDescription = post.content;

  // Smiley
  let smileyImage = document.createElement("img");
  smileyImage.src = "minesweeper.png";
  smileyImage.style.visibility = "hidden";
  smileyImage.className = "smiley";
  postDiv.appendChild(smileyImage);

  // Return the post
  return postDiv;
}

async function main() {
  let posts = await loadFeed();
  updateUI(posts);
  let loadingIndicator = document.getElementById("loading");
  loadingIndicator.remove();
}

const mask = document.querySelector('.mask');
        
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Update the mask position
    mask.style.maskImage = `radial-gradient(circle at ${mouseX}px ${mouseY}px, transparent 0, transparent 100px, black 120px)`;
    mask.style.webkitMaskImage = `radial-gradient(circle at ${mouseX}px ${mouseY}px, transparent 0, transparent 100px, black 120px)`;
});

main();
