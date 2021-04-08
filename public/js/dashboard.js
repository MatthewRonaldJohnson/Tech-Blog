

const deletePost = async function({target: {dataset: {id}}}){
    const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
    })

    if(response.ok){
        location = location;
    } else {
        alert('Error post could not be deleted')
    }
}

const updatePost = function({target: {dataset: {id}}}) {
    location = `/dashboard/updatePost/${id}`;
}



const delBtns = document.querySelectorAll('.delete')
delBtns.forEach(btn => btn.addEventListener('click', deletePost))

const updateBtns = document.querySelectorAll('.update')
updateBtns.forEach(btn => btn.addEventListener('click', updatePost))