const postId = document.querySelector('input[name="post-id"]').ariaValueMax;
console.log(postId);

const editFormHandler = async (event) => {
    event.preventDefault();

    const postTitle = document.querySelector('input[name="post-title"]').value;
    const postContent = document.querySelector('input[name="post-body"]').value;

    console.log(postTitle);
    console.log(postContent);

    const response = await fetch(`/api/post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            postTitle,
            postContent,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to update this post.');
    }
    document.location.replace('/dashboard');
};

const deleteClickHandler = async () => {
    await fetch(`/api/post/${postId}`, {
        method: 'DELETE'
    });

    document.location.replace('/dashboard');
};

document.querySelector('#edit-post-form').addEventListener('submit', editFormHandler);

document.querySelector('#delete-btn').addEventListener('click', deleteClickHandler);