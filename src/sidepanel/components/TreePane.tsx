import { useEffect, useState } from 'react';
import { DomNode } from '@/src/sidepanel/types';
import { DomTreeItem } from '@/src/sidepanel/components/DomTreeItem';

interface TreePaneProps {
    title: string;
    root: DomNode | null;
    marks: Record<string, boolean>;
    selectedPath: string;
    onSelect: (path: string) => void;
}

export const TreePane = ({ title, root, marks, selectedPath, onSelect }: TreePaneProps) => {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({ root: true });
    const path = selectedPath || 'root';
    useEffect(() => { setExpanded({ root: true }); }, [root ? root.path : '']);
    useEffect(() => {
        setExpanded((current) => path.split('.').reduce<Record<string, boolean>>((result, _, index, parts) => ({ ...result, [parts.slice(0, index + 1).join('.')]: true }), { ...current, root: true }));
    }, [selectedPath]);
    if (!root) return <section className="panel tree-pane"><div className="panel-head"><strong>{title}</strong></div><div className="empty">Load a selector from both tabs to render the tree.</div></section>;
    return (
        <section className="panel tree-pane">
            <div className="panel-head"><strong>{title}</strong><span>{root.label}</span></div>
            <ul className="tree-list"><DomTreeItem depth={0} expanded={expanded} item={root} marks={marks} selectedPath={selectedPath} onSelect={onSelect} onToggle={(itemPath) => setExpanded((current) => ({ ...current, [itemPath]: !current[itemPath] }))} /></ul>
        </section>
    );
};
