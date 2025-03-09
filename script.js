// Function to fetch posts and populate the table
async function fetchPostsAndPopulateTable() {
  try {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let posts = await response.json();
    
    // Clear previous table rows
    document.getElementById('postsBody').innerHTML = '';
    
    // Populate the table with fetched data
    posts.forEach(post => {
      let row = document.createElement('tr');
      row.innerHTML = `
        <td>${post.id}</td>
        <td>${post.title}</td>
        <td>${post.body}</td>
        <td>${post.userId}</td>
        <td>
          <button onclick="editPost(${post.id})">Edit</button>
          <button onclick="deletePost(${post.id})">Delete</button>
        </td>
      `;
      document.getElementById('postsBody').appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

// Function to add a new post
function addPost() {
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: 'New Title',
      body: 'New Body',
      userId: 1 // Example user ID
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then(response => response.json())
  .then(json => {
    console.log('New post added:', json);
    fetchPostsAndPopulateTable(); // Refresh table after adding
  });
}

// Function to edit a post
function editPost(postId) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      id: postId,
      title: 'Updated Title',
      body: 'Updated Body',
      userId: 1 // Example user ID
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then(response => response.json())
  .then(json => {
    console.log('Post updated:', json);
    fetchPostsAndPopulateTable(); // Refresh table after updating
  });
}

// Function to delete a post
function deletePost(postId) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete post');
    }
    console.log('Post deleted successfully');
    fetchPostsAndPopulateTable(); // Refresh table after deleting
  })
  .catch(error => {
    console.error('Error deleting post:', error);
  });
}

// Initial fetch and populate table on page load
fetchPostsAndPopulateTable();
