const deletePost = async function(event){
    const response = await fetch(`/api/post/${event.target.dataset.id}`, {
        method: 'DELETE',
    })

    if(response.ok){
        location = location;
    } else {
        alert('Error post could not be deleted')
    }
}



const delBtns = document.querySelectorAll('.btn-danger')
delBtns.forEach(btn => btn.addEventListener('click', deletePost))