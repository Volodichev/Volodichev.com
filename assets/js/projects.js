async function loadProjects() {
    try {
        const response = await fetch("assets/data/projects.json");

        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }

        const projects = await response.json();
        renderFeatured(projects);

    } catch (error) {
        console.error("Ошибка загрузки projects.json:", error);
    }
}

function createProjectCard(project) {
    const card = document.createElement("div");
    card.className = "card";

    const tagsHTML = project.tags
        .map(tag => `<span class="tag">${tag}</span>`)
        .join("");

    const detailsHTML = project.details
        ? `<ul>${project.details.map(d =>
            `<li style="font-size:13px;color:#9ca3af;margin-top:6px;">${d}</li>`
        ).join("")}</ul>`
        : "";

    card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div style="margin-top:10px;">${tagsHTML}</div>
        ${detailsHTML}
    `;

    return card;
}

function renderFeatured(projects) {
    const container = document.getElementById("featured-projects");
    if (!container) return;

    const featured = projects.filter(p => p.featured);

    container.innerHTML = "";

    featured.forEach(project => {
        container.appendChild(createProjectCard(project));
    });
}

document.addEventListener("DOMContentLoaded", loadProjects);
