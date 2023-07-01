window.onload = function() {
    const getEl = (id, doc = document) => doc.getElementById(id);
    const query = (selector, doc = document) => doc.querySelector(selector);
    const getParams = (param, searchParams = new URLSearchParams(window.location.search)) =>
        searchParams.get(param) || searchParams.get(searchParams) || param;
    const hash = window.location.hash;
    const isError = hash === "#error";

    if (isError) {
        return renderErrorPage();
    }

    renderHelpPage();

    function renderErrorPage() {
        const errorContainer = document.createElement("div");
        errorContainer.innerHTML = `
            <div class="error-container">
                <h1 class="error-title">404</h1>
                <p class="error-message">Oops, there is something wrong...</p>
                <a class="error-button" href="index.html">返回首页</a>
            </div>
        `;
        document.body.innerHTML = "";
        document.body.appendChild(errorContainer);
    }

    function renderHelpPage() {
        const titleBar = query("#title-bar");
        const sidebar = query(".sidebar ul");
        const contentArea = query("#content-area");

        fetch(getParams("id") + ".md")
            .then((response) => response.text())
            .then((data) => {
                const headings = [];
                let pageNumber = 0;
                const markedData = marked(data);
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = markedData;
                const headingElements = tempDiv.querySelectorAll("h2, h3, h4, h5, h6");

                headingElements.forEach((heading, index) => {
                    const headingText = heading.innerText;
                    if (index + 1 === parseInt(getParams("page"))) {
                        pageNumber = index;
                    }
                    const listItem = document.createElement("li");
                    const link = document.createElement("a");
                    link.href = `index.html?id=${getParams("id")}&page=${index + 1}`;
                    link.innerText = headingText;
                    listItem.appendChild(link);
                    sidebar.appendChild(listItem);
                });

                titleBar.innerText = headings[pageNumber];
                contentArea.innerHTML = markedData;
            });
    }
};