(async () => {
  const nav = document.querySelector("nav");
  const footer = document.querySelector("footer");
  async function getComponent(component) {
    const search = new URLSearchParams({
      ids: component,
    });
    console.log(search);
    const res_component = await fetch(
      `/api/common_components?${search.toString()}`,
      { method: "GET" }
    );
    const tempHTMLElement = document.createElement("html");
    tempHTMLElement.innerHTML = await res_component.text();
    const componentHTML = tempHTMLElement.children[1].children[0].innerHTML;
    tempHTMLElement.remove();
    return componentHTML;
  }
  // Insert nav html to nav element
  getComponent("nav").then((navHTML) => {
    nav.innerHTML = navHTML;
    // Selects the nav, pages ul, gets pages list items as HTML collection
    const pagesList = document.querySelector(".pages");
    const pagesListItems = pagesList.children;
    // Iterates through the pages list items until a match is found with the `nav id` and `list item id`
    for (let i = 0; i < pagesListItems.length; i++) {
      if (nav.id === pagesListItems[i].id) {
        // Then adds the appropriate CSS class to the elements to add the blue highlight
        pagesListItems[i].classList.add("current-nav-item");
        pagesListItems[i].children[0].classList.add("current-nav-link");
        break;
      }
    }
  });
  const footerHTML = await getComponent("footer");
  footer.innerHTML = footerHTML;
})();
