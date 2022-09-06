const createComment = async (event) => {
    event.preventDefault()
    const content = document.querySelector("#comment-body").value;
    const post_id = document.querySelector(".post-title").getAttribute("data-id");
    console.log(content, post_id)
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        content,
        post_id,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
  
      window.location.reload();
    } else {
      alert('Woops! That comment was not added!')
    }
  };
  
  const commentBTN = document.querySelector("#comment-button");
  
  commentBTN.addEventListener("click", createComment);