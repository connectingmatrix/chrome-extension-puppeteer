export const readDomSnapshot = (selector: string) => {
    const readLabel = (element: Element) => {
        const tag = element.tagName.toLowerCase();
        const idName = element.id ? `#${element.id}` : '';
        const classes = Array.from(element.classList).slice(0, 3).map((name) => `.${name}`).join('');
        return `${tag}${idName}${classes}`;
    };
    const readNode = (element: Element, path: string): unknown => ({
        path,
        label: readLabel(element),
        tag: element.tagName.toLowerCase(),
        classes: Array.from(element.classList),
        items: Array.from(element.children).map((child, index) => readNode(child, `${path}.${index}`))
    });
    const root = document.querySelector(selector);
    if (!root) return { selector, rootLabel: '', tree: null, error: `No element matches ${selector}` };
    return { selector, rootLabel: readLabel(root), tree: readNode(root, 'root'), error: '' };
};

export const readNodeDetail = (selector: string, path: string, styleNames: string[]) => {
    const readLabel = (element: Element) => {
        const tag = element.tagName.toLowerCase();
        const idName = element.id ? `#${element.id}` : '';
        const classes = Array.from(element.classList).slice(0, 3).map((name) => `.${name}`).join('');
        return `${tag}${idName}${classes}`;
    };
    let target = document.querySelector(selector);
    if (!target) return { path, label: '', classes: [], styles: {}, error: `No element matches ${selector}` };
    for (const part of path.split('.').slice(1)) {
        const child = target.children[Number(part)];
        if (!child) return { path, label: '', classes: [], styles: {}, error: 'No matching node at this path.' };
        target = child;
    }
    const computed = getComputedStyle(target);
    const styles = styleNames.reduce<Record<string, string>>((result, name) => ({ ...result, [name]: computed.getPropertyValue(name).trim() }), {});
    return { path, label: readLabel(target), classes: Array.from(target.classList), styles, error: '' };
};
