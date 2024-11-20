import { config } from './logiverse.js';

const statsDiv = document.getElementById("stats");

async function countPosts() {
    const instances = await Promise.all(
        config.instances.map(({ endpoints, name }) => 
            fetch(endpoints.feed)
                .then(res => res.json())
                .catch(() => ([]))
                .then(feed => ({ name, feed }))
        )
    );

    const counts = instances.reduce((acc, instance) => {
        if (Array.isArray(instance.feed)) {
            acc[instance.name] = instance.feed.length;
        } else {
            acc[instance.name] = 0;
        }
        return acc;
    }, {});

    return counts;
}

function updateUI(postCounts) {
    const sortedInstances = Object.entries(postCounts).sort(([, a], [, b]) => b - a);

    for (let [instance, count] of sortedInstances) {
        let statElement = document.createElement("div");
        let statHeader = document.createElement("h2");
        let headerContent = document.createTextNode(instance);
        statHeader.appendChild(headerContent);
        let statBody = document.createElement("p");
        let statContent = document.createTextNode(count + " users");
        statBody.appendChild(statContent);
        statElement.appendChild(statHeader);
        statElement.appendChild(statBody);
        statsDiv.appendChild(statElement);
    }
}

async function main() {
    let postCounts = await countPosts();
    updateUI(postCounts);
    let loadingIndicator = document.getElementById("loading");
    loadingIndicator.remove();
}

main();
