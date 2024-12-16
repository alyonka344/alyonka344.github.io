document.addEventListener("DOMContentLoaded", async () => {
    const targetUrl = "MyGallery.html";

    const response = await fetch(targetUrl);

    if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.status}`);
    }
    await response.text();

    setTimeout(() => {
        window.location.href = targetUrl;
    }, 2000);
});