function initFilters(projects) {
    const container = document.getElementById("filters");
    if (!container) return;

    const allTags = new Set();

    projects.forEach(project => {
        project.tags.forEach(tag => allTags.add(tag));
    });

    const tagsArray = ["all", ...Array.from(allTags).sort()];

    tagsArray.forEach(tag => {
        const btn = document.createElement("button");
        btn.className = "filter-btn";
        btn.textContent = tag;
        btn.dataset.tag = tag;

        if (tag === "all") {
            btn.classList.add("active");
        }

        btn.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn")
                .forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            if (tag === "all") {
                renderProjects(projects);
            } else {
                const filtered = projects.filter(p =>
                    p.tags.includes(tag)
                );
                renderProjects(filtered);
            }
        });

        container.appendChild(btn);
    });
}
