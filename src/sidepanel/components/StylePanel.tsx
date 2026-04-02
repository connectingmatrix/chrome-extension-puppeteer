import { readClassRows, readStyleRows } from '@/src/sidepanel/lib/style-diff';
import { NodeDetail } from '@/src/sidepanel/types';

interface StylePanelProps {
    title: string;
    detail: NodeDetail;
    other: NodeDetail;
}

export const StylePanel = ({ title, detail, other }: StylePanelProps) => {
    const classRows = detail.label ? readClassRows(detail, other) : [];
    const styleRows = detail.label ? readStyleRows(detail, other) : [];
    if (detail.error) return <section className="panel"><div className="panel-head"><strong>{title}</strong></div><div className="empty">{detail.error}</div></section>;
    if (!detail.label) return <section className="panel"><div className="panel-head"><strong>{title}</strong></div><div className="empty">Select a node to inspect class names and computed styles.</div></section>;
    return (
        <section className="panel">
            <div className="panel-head"><strong>{title}</strong><span>{detail.label}</span></div>
            <div className="group-title">Classes</div>
            <div className="diff-grid">{classRows.length ? classRows.map((row) => <div key={row.name} className={`diff-row ${row.tone}`}><strong>{row.name}</strong><span>{row.value}</span></div>) : <div className="empty">No classes on this node.</div>}</div>
            <div className="group-title">Styles</div>
            <div className="diff-grid">{styleRows.map((row) => <div key={row.name} className={`diff-row ${row.tone}`}><strong>{row.name}</strong><span>{row.value || 'unset'}</span></div>)}</div>
        </section>
    );
};
