const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector("#post-title").value.trim();
    const content = document.querySelector("#post-desc").value.trim();
  
    if (title && content) {
      console.log(title, content);
      const response = await fetch(`/api/posts`, {
        method: "POST",
        body: JSON.stringify({ title: title, content: content }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        window.location.reload();
        alert("Wahoo! You have created a post! Check it out on the dashboard")
      } else {
        alert("Woops! Can not create a new post!");
      }
    }
  };
  
  document
    .querySelector(".new-post-form")
    .addEventListener("submit", newFormHandler);