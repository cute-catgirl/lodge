import { config } from './logiverse.js';

const DOMfeed = document.getElementById("feed");

let DATE_OFFSET = new Date().getTimezoneOffset() * 60000

const units = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: 24 * 60 * 60 * 1000 * 365 / 12,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000
}

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

function getRelativeTime(d1, d2 = new Date()) {
    let elapsed = d1 - d2

    for (var u in units)
        if (Math.abs(elapsed) > units[u] || u == 'second')
            return rtf.format(Math.round(elapsed / units[u]), u)
}

async function loadFeed() {
  let posts = [];
  const instances = await Promise.all(config.instances.map(({ endpoints, name }) => fetch(endpoints.feed).then(res => res.json()).catch(() => ([])).then(feed => ({ name, feed }))))

  for (let instance of instances) {
    if (!Array.isArray(instance.feed)) continue
    for (let post of instance.feed) {
      if (typeof post[0] === 'string' &&
        typeof post[1] === 'string' &&
        new Date(post[2]).getTime()) posts.push({
          content: post[0],
          author: post[1],
          date: new Date(new Date(post[2]) - DATE_OFFSET),
          gif: post[3] || '',
          instance: instance.name
        })
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
  // Create the post container
  let postDiv = document.createElement("div");
  postDiv.className = "status";
  // Create the header
  let postHeader = document.createElement("h2");
  let headerContent = document.createTextNode(post.author + '@' + post.instance);
  postHeader.appendChild(headerContent);

  // Create the body
  let postBody = document.createElement("p");
  let bodyContent = document.createTextNode(post.content);
  postBody.appendChild(bodyContent);

  // Create the footer
  let postFooter = document.createElement("p");
  let footerContent = document.createTextNode(getRelativeTime(new Date(post.date)));
  postFooter.appendChild(footerContent);
  postFooter.className = "footer";

  // Put it all together
  postDiv.appendChild(postHeader);
  postDiv.appendChild(postBody);
  postDiv.appendChild(postFooter);

  // Return the post
  return postDiv;
}

async function main() {
  let posts = await loadFeed();
  updateUI(posts);
  let loadingIndicator = document.getElementById("loading");
  loadingIndicator.remove();
}

main();