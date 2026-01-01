function redirectToEdit(postId) {
        window.location.href = `pg2.html?postId=${postId}`;
    }
    function redirectToDelete(postId) {
        window.location.href = `pg4.html?postId=${postId}`;
    }
    function redirectToNewPost() {
        window.location.href = 'pg3.html';
    }
    function handleFormSubmit(event) {
        event.preventDefault(); 
    
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
    
        if (!title || !content) {
            alert("Please fill in both the title and content.");
            return;
        }
        console.log("Title:", title);
        console.log("Content:", content);
        window.location.href = 'index.html';
    }
    
    