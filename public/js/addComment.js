const addCommentBtn = document.getElementById('addComment');
const newCommentForm = document.getElementById('newCommentForm')
const newCommentInput = document.getElementById('comment')

addCommentBtn.addEventListener('click', function () {
    newCommentForm.hidden = false;
    addCommentBtn.hidden = true;
})

newCommentForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    //get text from form and add it to comment db, and append it to the current page
    const post_id = window.location.href.charAt(window.location.href.length - 1);
    const response = await fetch('/api/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                body: newCommentInput.value,
                post_id,
            },
        )
    })
    location = location;
})
