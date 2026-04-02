import { useDeferredValue, useEffect, useState } from 'react';
import { DomNode } from '@/src/sidepanel/types';
import { DomTreeItem } from '@/src/sidepanel/components/DomTreeItem';
import { readTreeSearch } from '@/src/sidepanel/lib/tree-search';

interface TreePaneProps {
    title: string;
    root: DomNode | null;
    marks: Record<string, boolean>;
    selectedPath: string;
    onSelect: (path: string) => void;
}

export const TreePane = ({ title, root, marks, selectedPath, onSelect }: TreePaneProps) => {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({ root: true });
    const [search, setSearch] = useState('');
    const deferredSearch = useDeferredValue(search);
    const path = selectedPath || 'root';
    const result = readTreeSearch(root, deferredSearch);
    const visibleRoot = result.root;
    useEffect(() => { setExpanded({ root: true }); setSearch(''); }, [root ? root.path : '']);
    useEffect(() => {
        const selected = path.split('.').reduce<Record<string, boolean>>((next, _, index, parts) => ({ ...next, [parts.slice(0, index + 1).join('.')]: true }), { root: true });
        setExpanded((current) => ({ ...current, ...selected, ...result.expanded }));
    }, [deferredSearch, path, root ? root.path : '']);
    if (!root) return <section className="panel tree-pane"><div className="panel-head"><strong>{title}</strong></div><div className="empty">Load a selector from both tabs to render the tree.</div></section>;
    return (
        <section className="panel tree-pane">
            <div className="panel-head"><strong>{title}</strong><span>{root.label}</span></div>
            <input className="field tree-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search nodes, tags, classes" />
            {visibleRoot
                ? <ul className="tree-list"><DomTreeItem depth={0} expanded={expanded} found={result.found} item={visibleRoot} marks={marks} selectedPath={selectedPath} onSelect={onSelect} onToggle={(itemPath) => setExpanded((current) => ({ ...current, [itemPath]: !current[itemPath] }))} /></ul>
                : <div className="empty">No tree nodes match this search.</div>}
        </section>
    );
};
