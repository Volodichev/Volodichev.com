async function loadTelegramChannels() {
    try {
        const response = await fetch("assets/data/telegram.json");

        if (!response.ok) {
            throw new Error("Failed to load telegram.json");
        }

        const channels = await response.json();
        renderTelegram(channels);

    } catch (error) {
        console.error("Ошибка загрузки telegram.json:", error);
    }
}

function createTelegramCard(channel) {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <h3>${channel.title}</h3>
        <p>${channel.description}</p>
        <div style="margin-top:15px;">
            <a class="btn btn--primary" href="${channel.url}" target="_blank">
                @${channel.username}
            </a>
        </div>
    `;

    return card;
}

function renderTelegram(channels) {
    const container = document.getElementById("telegram-channels");
    if (!container) return;

    container.innerHTML = "";

    channels.forEach(channel => {
        container.appendChild(createTelegramCard(channel));
    });
}

document.addEventListener("DOMContentLoaded", loadTelegramChannels);
