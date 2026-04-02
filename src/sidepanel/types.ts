export interface BrowserTab {
    id: number;
    title: string;
    url: string;
}

export interface DomNode {
    path: string;
    label: string;
    tag: string;
    classes: string[];
    items: DomNode[];
}

export interface Snapshot {
    selector: string;
    rootLabel: string;
    tree: DomNode | null;
    error: string;
}

export interface NodeDetail {
    path: string;
    label: string;
    classes: string[];
    styles: Record<string, string>;
    error: string;
}

export interface DiffRow {
    name: string;
    value: string;
    tone: 'base' | 'warn' | 'danger';
}
