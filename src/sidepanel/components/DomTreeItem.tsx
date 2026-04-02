import { DomNode } from '@/src/sidepanel/types';

interface DomTreeItemProps {
    depth: number;
    expanded: Record<string, boolean>;
    item: DomNode;
    marks: Record<string, boolean>;
    selectedPath: string;
    onSelect: (path: string) => void;
    onToggle: (path: string) => void;
}

export const DomTreeItem = ({ depth, expanded, item, marks, selectedPath, onSelect, onToggle }: DomTreeItemProps) => {
    // Adapted from /Users/abeer/dev/giga/tree/src/sidebar-item.tsx.
    const hasChildren = Boolean(item.items.length);
    const open = expanded[item.path];
    const selected = selectedPath === item.path;
    const diff = marks[item.path];
    return (
        <li className="tree-node">
            <div className={`tree-row${selected ? ' is-selected' : ''}${diff ? ' is-diff' : ''}`} style={{ marginLeft: `${depth * 18}px` }}>
                <button type="button" className="tree-label" onClick={() => onSelect(item.path)}>
                    <span className="tree-tag">{item.label}</span>
                    <span className="tree-meta">{item.items.length} children</span>
                </button>
                {diff ? <span className="tree-badge">diff</span> : null}
                {hasChildren ? <button type="button" className="tree-toggle" onClick={() => onToggle(item.path)}>{open ? '▾' : '▸'}</button> : null}
            </div>
            {hasChildren && open ? <ul className="tree-list">{item.items.map((child) => <DomTreeItem key={child.path} depth={depth + 1} expanded={expanded} item={child} marks={marks} selectedPath={selectedPath} onSelect={onSelect} onToggle={onToggle} />)}</ul> : null}
        </li>
    );
};
