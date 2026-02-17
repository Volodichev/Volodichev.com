async function loadSkills() {
  const container = document.getElementById("tag-cloud");

  try {
    const response = await fetch("assets/data/skills.json");
    const skills = await response.json();

    skills.forEach(skill => {
      const tag = document.createElement("span");
      tag.className = "tag-cloud__item";
      tag.textContent = skill.name;

      const minSize = 12;
      const maxSize = 36;

      const size = minSize + (skill.level / 100) * (maxSize - minSize);

      tag.style.fontSize = size + "px";
      tag.style.opacity = 0.5 + (skill.level / 100) * 0.5;

      container.appendChild(tag);
    });

  } catch (error) {
    console.error("Ошибка загрузки skills:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadSkills);
