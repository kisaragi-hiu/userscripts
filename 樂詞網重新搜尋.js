// ==UserScript==
// @name         樂詞網搜尋頁面使用效率改善
// @namespace    https://kisaragi-hiu.com
// @version      2024-09-25b
// @description  讓樂詞網的搜尋能更好用一點
// @author       Kisaragi Hiu
// @match        https://terms.naer.edu.tw/search*
// @icon         https://terms.naer.edu.tw/static/da/img/ic_fav.png
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  "use strict";

  // We want to grab the search form and move it somewhere reasonable
  const search = document.getElementById("search-query");
  // This is the 中央內容區塊 anchor. The element after it is the breadcrumbs.
  // We want to add the form after that element.
  const target = document.getElementById("AC").nextElementSibling;

  // Wrapper for styling.
  const wrapper = document.createElement("section");
  wrapper.className = "s_2 py-3 py-md-0";
  search.classList.add("container-xxl");

  // Do the actual DOM work beyond classes.
  search.remove();
  wrapper.append(search);
  target.after(wrapper);
  document.querySelector("a[href='#modal-requery']").remove();

  for (const td of document.querySelectorAll(
    `#pageContent .tbody .td[aria-label='英文詞彙'], #pageContent .tbody .td[aria-label='中文詞彙']`
  )) {
    // We can't just slap another button into the "td" (which is actually a div.td)
    // Because NAER's style assumes the td only has one child and looks wrong if you add more.
    const link = td.querySelector("a");
    const wrapper = document.createElement("div");
    const btn = document.createElement("button");
    btn.append("複製");
    btn.addEventListener("click", () => {
      navigator.clipboard.writeText(link.innerText);
    });

    link.style.width = "calc(100% - 5ch)";
    wrapper.classList.add("justify-content-between");
    wrapper.style.display = "flex";

    link.remove();
    wrapper.append(link);
    wrapper.append(btn);
    td.append(wrapper);
  }
})();
