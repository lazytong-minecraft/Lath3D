window.addEventListener('DOMContentLoaded', () => {
    const getEl = (id, doc = document) => doc.getElementById(id);
    const query = (selector, doc = document) => doc.querySelector(selector);
    const sidebar = query(".sidebar ul");
    const contentArea = query("#content-area");
    const searchBar = getEl("search-bar");
    const searchButton = getEl("search-button");
    const closeButton = getEl("close-button");
    const searchResult = getEl("search-result");
    const titleBar = getEl("title-bar");
    const currentYear = new Date().getFullYear();
    const renderHelpPage = async () => {
        try {
            const response = await fetch("index.md");
            if (!response.ok) {
                renderErrorPage();
            }
            const data = await response.text();
            const markedData = marked(data);
            contentArea.innerHTML = markedData + "<p style="text-align: center;">Copyright" + currentYear + "LazyTong</p>";
            console.log("Lath3D帮助文档已加载完成");
        } catch (error) {
            renderErrorPage();
        }
    };
    const renderErrorPage = () => {
        const errorContainer = document.createElement("div");
        errorContainer.innerHTML = `
            <div class="error-container">
                <h1 class="error-title">404</h1>
                <p class="error-message">Oops，该页面不存在</p>
                <a class="error-button" href="index.html">返回首页</a>
            </div>
        `;
        document.body.innerHTML = "";
        document.body.appendChild(errorContainer);
        const link = errorContainer.querySelector(".error-button");
        link.href = "index.html#error";
    };
    const performSearch = () => {
        const keyword = searchBar.value.trim().toLowerCase();
        const sidebarItems = Array.from(sidebar.children);
        if (keyword === "") {
            sidebarItems.forEach(item => item.style.display = "block");
            searchResult.style.display = "none";
            return;
        };
        const matchingItems = sidebarItems.filter(item => item.textContent.toLowerCase().includes(keyword));
        sidebarItems.forEach(item => item.style.display = "none");
        if (matchingItems.length === 0) {
            searchResult.innerText = "没有找到任何相关的内容";
            searchResult.style.display = "block";
        } else {
            matchingItems.forEach(item => item.style.display = "block");
            searchResult.style.display = "none";
        }
    };
    const handleSearchButtonClick = () => {
        performSearch();
        searchButton.style.display = "none";
        closeButton.style.display = "block";
    };
    const handleCloseButtonClick = () => {
        searchBar.value = "";
        performSearch();
        searchButton.style.display = "block";
        closeButton.style.display = "none";
    };
    renderHelpPage();
    searchButton.addEventListener("click", handleSearchButtonClick);
    closeButton.addEventListener("click", handleCloseButtonClick);
    searchBar.addEventListener("input", performSearch);
});
