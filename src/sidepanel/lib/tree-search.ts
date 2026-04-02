import { DomNode } from '@/src/sidepanel/types';

const readText = (item: DomNode) => `${item.label} ${item.tag} ${item.classes.join(' ')}`.toLowerCase();
const copyTree = (item: DomNode): DomNode => ({ ...item, items: item.items.map(copyTree) });

const openTree = (item: DomNode, expanded: Record<string, boolean>) => {
    expanded[item.path] = true;
    for (const child of item.items) openTree(child, expanded);
};

const readMatch = (item: DomNode, query: string, expanded: Record<string, boolean>, found: Record<string, boolean>): DomNode | null => {
    if (readText(item).includes(query)) {
        found[item.path] = true;
        openTree(item, expanded);
        return copyTree(item);
    }
    const items: DomNode[] = [];
    for (const child of item.items) {
        const match = readMatch(child, query, expanded, found);
        if (match) items.push(match);
    }
    if (!items.length) return null;
    expanded[item.path] = true;
    return { ...item, items };
};

export const readTreeSearch = (root: DomNode | null, search: string) => {
    const query = search.trim().toLowerCase();
    const expanded: Record<string, boolean> = { root: true };
    const found: Record<string, boolean> = {};
    if (!root || !query) return { root, expanded, found };
    return { root: readMatch(root, query, expanded, found), expanded, found };
};
