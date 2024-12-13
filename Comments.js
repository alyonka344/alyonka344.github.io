document.addEventListener("DOMContentLoaded", () => {
    const commentsContainer = document.getElementById("comments-container");
    const loader = document.getElementById("comments-loader");
    const commentInput = document.getElementById("comment");
    const commentName = document.getElementById("comment__sender-name");
    const commentText = document.getElementById("comment__text");
    const randomFilter = Math.random() > 0.5 ? '?id_gte=10&id_lte=20' : '?id_lte=10';
    const url = `https://jsonplaceholder.typicode.com/comments${randomFilter}`;

    async function loadComments() {
        loader.style.display = "block";
        while (commentsContainer.firstChild) {
            commentsContainer.removeChild(commentsContainer.firstChild);
        }

        await fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Ошибка загрузки данных.");
                }
                return response.json();
            })
            .then((comments) => {
                loader.style.display = "none";
                renderComments(comments);
            })
            .catch((error) => {
                loader.style.display = "none";
                const errorMessage = document.createElement("div");
                errorMessage.className = "comments__error";
                errorMessage.textContent = "⚠ Что-то пошло не так: " + error.message;
                commentsContainer.appendChild(errorMessage);
            });
    }

    commentInput.addEventListener("submit", (e) => {
        e.preventDefault();

        const newComment = {
            name: commentName.value,
            body: commentText.value,
            email: "anon@example.com",
        };

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newComment),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Ошибка при отправке комментария");
                }
                return response.json();
            })
            .then((savedComment) => {
                renderComments([savedComment]);
                commentInput.reset();
            })
            .catch((error) => {
                alert("⚠️ Не удалось отправить комментарий.");
                console.error("Ошибка:", error);
            });
    });

    function renderComments(comments) {
        comments.forEach((comment) => {
            const commentItem = document.createElement("div");
            commentItem.className = "comments__item";

            const commentTitle = document.createElement("div");
            commentTitle.className = "comments__item-title";
            commentTitle.textContent = `${comment.name} (${comment.email})`;

            const commentBody = document.createElement("div");
            commentBody.className = "comments__item-body";
            commentBody.textContent = comment.body;

            commentItem.appendChild(commentTitle);
            commentItem.appendChild(commentBody);

            commentsContainer.appendChild(commentItem);
        });
    }

    loadComments()
});
