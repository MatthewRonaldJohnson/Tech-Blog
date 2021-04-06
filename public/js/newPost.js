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
    await createNewPost(buildNewPost(postTitle.value, postBody.value, 1))
    //won't go to api route, and id number will be injected into string 
    console.log('now go to new page')
    //location = `http://localhost:3001/api/post/${id}`;
})

function buildNewPost(title, body, user_id) {
    const newPost = {
        title,
        body,
        user_id,
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
    console.log(response, 'added to db');
}