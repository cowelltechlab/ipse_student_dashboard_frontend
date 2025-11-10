/**
 * Converts flat Quill lists with ql-indent-* classes into properly nested HTML lists
 */
function nestQuillLists(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Process all lists (ul and ol) - need to convert to array to avoid live collection issues
  const lists = Array.from(doc.querySelectorAll('ul, ol'));

  lists.forEach(list => {
    // Only process top-level lists (not already nested)
    if (list.parentElement && (list.parentElement.tagName === 'UL' || list.parentElement.tagName === 'OL')) {
      return;
    }

    const items = Array.from(list.children).filter(child => child.tagName === 'LI');
    if (items.length === 0) return;

    // Build a structured representation
    interface ListItem {
      level: number;
      element: HTMLElement;
      children: ListItem[];
    }

    const rootItems: ListItem[] = [];
    const stack: ListItem[] = [];

    items.forEach(item => {
      const li = item as HTMLElement;

      // Determine indent level from class
      let level = 0;
      const classMatch = li.className.match(/ql-indent-(\d+)/);
      if (classMatch) {
        level = parseInt(classMatch[1], 10);
      }

      // Clone the item (shallow clone, then selectively copy content)
      const clonedLi = li.cloneNode(false) as HTMLElement;

      // Copy only direct child nodes that are NOT lists
      Array.from(li.childNodes).forEach(child => {
        // Skip any nested ul/ol elements
        if (child.nodeType === Node.ELEMENT_NODE) {
          const childElement = child as HTMLElement;
          if (childElement.tagName === 'UL' || childElement.tagName === 'OL') {
            return; // Skip nested lists
          }
        }
        // Copy text nodes and other inline elements
        clonedLi.appendChild(child.cloneNode(true));
      });

      // Remove ql-indent classes from cloned element
      clonedLi.className = clonedLi.className.replace(/\s*ql-indent-\d+/g, '').trim();
      if (!clonedLi.className) {
        clonedLi.removeAttribute('class');
      }

      const listItem: ListItem = {
        level,
        element: clonedLi,
        children: []
      };

      // Pop stack until we find the correct parent level
      while (stack.length > 0 && stack[stack.length - 1].level >= level) {
        stack.pop();
      }

      if (stack.length === 0) {
        // This is a root level item
        rootItems.push(listItem);
      } else {
        // This is a child of the item at top of stack
        stack[stack.length - 1].children.push(listItem);
      }

      stack.push(listItem);
    });

    // Build the nested HTML structure
    function buildHtml(items: ListItem[], listType: string): HTMLElement {
      const newList = doc.createElement(listType);

      items.forEach(item => {
        // Remove any existing nested lists from the cloned element
        const existingLists = item.element.querySelectorAll('ul, ol');
        existingLists.forEach(el => el.remove());

        newList.appendChild(item.element);

        // If this item has children, create a nested list
        if (item.children.length > 0) {
          const nestedList = buildHtml(item.children, listType);
          item.element.appendChild(nestedList);
        }
      });

      return newList;
    }

    // Replace the original list with the nested structure
    const newList = buildHtml(rootItems, list.tagName.toLowerCase());

    // Copy attributes from original list
    Array.from(list.attributes).forEach(attr => {
      newList.setAttribute(attr.name, attr.value);
    });

    list.replaceWith(newList);
  });

  return doc.body.innerHTML;
}

export function normalizeQuillLists(html: string): string {
  let out = html;

  // Quill often encodes bullets as <ol><li data-list="bullet">...</li></ol>
  // Convert those to a semantic <ul>
  out = out.replace(/<ol([^>]*)>([\s\S]*?)<\/ol>/gi, (_, attrs, inner) => {
    // If any top-level li carries data-list="bullet", treat as <ul>
    const hasBullet = /<li[^>]*\sdata-list="bullet"[^>]*>/i.test(inner);
    return hasBullet ? `<ul${attrs}>${inner}</ul>` : `<ol${attrs}>${inner}</ol>`;
  });

  // Remove editor-only artifacts
  out = out.replace(/<span class="ql-ui"[^>]*><\/span>/gi, "");
  out = out.replace(/\sdata-list="[^"]*"/gi, "");
  out = out.replace(/\scontenteditable="[^"]*"/gi, "");

  // Convert flat lists with ql-indent-* classes into properly nested lists
  // This must happen AFTER bullet conversion but BEFORE class removal
  if (out.includes('ql-indent-')) {
    out = nestQuillLists(out);
  }

  // Remove any remaining ql-indent classes
  out = out.replace(/\s*ql-indent-\d+/gi, "");

  // Fix illegal nesting: ensure sub-<ul>/<ol> lives inside its parent's <li>
  // (simple pass: wrap stray list siblings into previous <li>, best-effort)
  out = out.replace(/<\/li>\s*(<ul|<ol)/gi, (_, listStart) => `\n${listStart}`);
  out = out.replace(/(<\/ul>|<\/ol>)\s*(<ul|<ol)/gi, "$1<li>$2"); // rare edge

  return out;
}

