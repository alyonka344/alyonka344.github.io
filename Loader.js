// document.addEventListener("DOMContentLoaded", () => {
//     setTimeout(() => {
//         window.location.href = "MyGallery.html";
//     }, 2000);
// });

document.addEventListener("DOMContentLoaded", async () => {
    const targetUrl = "MyGallery.html";

    try {
        const response = await fetch(targetUrl);

        if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.status}`);
        }
        await response.text();

        setTimeout(() => {
            window.location.href = targetUrl;
        }, 1000);

    } catch (error) {
        console.error("Не удалось загрузить страницу:", error.message);
        document.body.innerHTML = `<div style="text-align:center;color:red;">
            ⚠ Ошибка загрузки страницы. Попробуйте позже.
        </div>`;
    }
});