const newPostForm = document.getElementById('newPostForm');
const postTitle = document.getElementById('title');
const postBody = document.getElementById('body');

newPostForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    console.log(postTitle.value, postBody.value);
    if(!postTitle.value || !postBody.value){
        alert("Your post must have a title and body!");
        return;
    }
    //build new post in DB w/ these values and user id, then link user to Post page for that post
    const newPostId = await createNewPost(buildNewPost(postTitle.value, postBody.value))
    //won't go to api route, and id number will be injected into string 
    location = `http://localhost:3001/post/${newPostId}`;
})

function buildNewPost(title, body) {
    const newPost = {
        title,
        body,
    };
    return newPost;
}

async function createNewPost(newPost) {
    const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    })
    return response.json()
}