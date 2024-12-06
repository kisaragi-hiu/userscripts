function getBookItems() {
  /** @type NodeListOf<HTMLDivElement> */
  let items = document.querySelectorAll(".book-item .book-txt");
  /** @type Array<HTMLDivElement> */
  const itemArray = [];
  items.forEach((e) => {
    if (!(e instanceof HTMLDivElement)) {
      throw new Error("Not all `.book-item .book-txt` elements are divs");
    }
    itemArray.push(e);
  });
  return itemArray;
}

/**
 * Return the trimmed text content of `item.querySelector(selector)`.
 * This adds some extra checks over just using the snippet inline.
 * @param {HTMLElement} item
 * @param {string} selector
 */
function querySelectorTextContent(item, selector) {
  const text = item.querySelector(selector)?.textContent?.trim();
  if (typeof text !== "string") {
    throw new Error("Extracted text is not a string");
  }
  if (text === "") {
    throw new Error("Extracted text is empty");
  }
  return text;
}

/**
 * Return title of `item` with some extra normalization.
 * @param {HTMLDivElement} item
 */
function itemTitle(item) {
  return querySelectorTextContent(item, ".book-tl-txt > h2");
}

/**
 * Return author of `item`. This can be missing.
 * @param {HTMLDivElement} item
 */
function itemAuthor(item) {
  try {
    return querySelectorTextContent(item, ".book-meta-item-author");
  } catch (_e) {
    return undefined;
  }
}

function inject() {
  const id = "kisaragi_text_export_div";
  if (document.querySelector(`#${id}`)) return;
  const anchor = document.querySelector(".bi_external > .bi_external_btn");
  const div = document.createElement("div");
  div.className = "bi_external_btn";
  div.id = id;
  const a = document.createElement("a");
  a.href = "javascript:void(0);";
  a.text = "Copy books on list page as text";
  a.addEventListener("click", () => {
    main();
  });
  div.appendChild(a);
  anchor.before(div);
}

function main() {
  navigator.clipboard.writeText(
    getBookItems()
      .map((e) => {
        let author = itemAuthor(e);
        if (author === undefined) {
          return `* ${itemTitle(e)}`;
        }
        return `* ${itemTitle(e)}
:PROPERTIES:
:author:  ${itemAuthor(e)}
:END:`;
      })
      .join("\n"),
  );
}

inject();
