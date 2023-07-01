function displayError() {
  const error = document.getElementById("error");
  error.innerHTML = "<h1>404</h1><p>Oops，无法找到该页面</p>";
  error.classList.remove("hidden");
  window.location.hash = "error";
}

function loadContent() {
  const content = document.getElementById("content");

  fetch("docs.md")
    .then((response) => {
      if (!response.ok) {
        throw new Error("无法找到该页面");
      }
      return response.text();
    })
    .then((text) => {
      content.innerHTML = marked(text);
      generateSidebar();
    })
    .catch((error) => {
      displayError();
    });
}

function generateSidebar() {
  const headings = document.querySelectorAll("#content h1, #content h2, #content h3, #content h4, #content h5, #content h6");
  const nav = document.getElementById("nav");

  headings.forEach((heading) => {
    const link = document.createElement("a");
    link.href = `#${heading.id}`;
    link.innerText = heading.innerText;
    nav.appendChild(link);
  });

  filterSidebar();
}

function filterSidebar() {
  const searchInput = document.getElementById("search");
  const sidebarItems = document.querySelectorAll("#sidebar a");

  searchInput.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();

    sidebarItems.forEach((item) => {
      const itemText = item.textContent.toLowerCase();

      if (itemText.includes(searchString)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  header.innerHTML = "<h1>Lath3D文档</h1>";

  loadContent();
});
