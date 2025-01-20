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

    let totalPosts = 0;

    for (let [instance, count] of sortedInstances) {
        totalPosts += count;
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
    
    let totalElement = document.createElement("div");
    let totalHeader = document.createElement("h2");
    let totalHeaderContent = document.createTextNode("Total");
    totalHeader.appendChild(totalHeaderContent);
    let totalBody = document.createElement("p");
    let totalContent = document.createTextNode(totalPosts + " users");
    totalBody.appendChild(totalContent);
    totalElement.appendChild(totalHeader);
    totalElement.appendChild(totalBody);
    statsDiv.appendChild(totalElement);
}

async function main() {
    let postCounts = await countPosts();
    updateUI(postCounts);
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
