const delButtonHandler = async (event) => {
    const id = event.target.getAttribute("data-id");
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
  
    if (response.ok) {
      window.location.assign("/dashboard");
    } else {
      alert("Woops! Can not delete that post!");
    }
  };
  
  const deleteButton = document.querySelector(".post-list");
  
  if (deleteButton) {
    deleteButton.addEventListener("click", delButtonHandler);
  }