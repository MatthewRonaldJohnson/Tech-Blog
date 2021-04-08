const postForm = document.getElementById('PostForm');
const postTitle = document.getElementById('title');
const postBody = document.getElementById('body');

postForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    if(!postTitle.value || !postBody.value){
        alert("Your post must have a title and body!");
        return;
    }
    //build new post in DB w/ these values and user id, then link user to Post page for that post
    await updatePost(buildNewPost(postTitle.value, postBody.value))
    location = `/post/${postId}`;
})

function buildNewPost(title, body) {
    const newPost = {
        title,
        body,
        id: postId, //postId variable defined in script tag in html
    };
    return newPost;
}

async function updatePost(post) {
    const response = await fetch('/api/post', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    return response.json()
}