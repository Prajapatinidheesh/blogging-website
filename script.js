async function loadPosts(){

  const res =
  await fetch("/posts");

  const posts =
  await res.json();

  const container =
  document.getElementById("posts");

  container.innerHTML = "";

  posts.forEach(post => {

    container.innerHTML += `
      <div class="post">
        <h3>${post.title}</h3>

        <p>${post.content}</p>

        <input
        id="comment-${post.id}"
        placeholder="Comment">

        <button
        onclick="addComment(${post.id})">
        Add
        </button>

        <button
        onclick="deletePost(${post.id})">
        Delete
        </button>

        <ul>
        ${post.comments
          .map(c => `<li>${c}</li>`)
          .join("")}
        </ul>
      </div>
    `;
  });
}

async function createPost(){

  const title =
  document.getElementById("title").value;

  const content =
  document.getElementById("content").value;

  await fetch("/posts",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      title,
      content
    })
  });

  loadPosts();
}

async function deletePost(id){

  await fetch(`/posts/${id}`,{
    method:"DELETE"
  });

  loadPosts();
}

async function addComment(id){

  const comment =
  document.getElementById(
    `comment-${id}`
  ).value;

  await fetch(
    `/posts/${id}/comment`,
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        comment
      })
    }
  );

  loadPosts();
}

loadPosts();
