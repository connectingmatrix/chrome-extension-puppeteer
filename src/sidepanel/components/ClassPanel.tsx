import { DiffCard } from '@/src/sidepanel/components/DiffCard';
import { readClassRows } from '@/src/sidepanel/lib/style-diff';
import { NodeDetail } from '@/src/sidepanel/types';

interface ClassPanelProps {
    detail: NodeDetail;
    other: NodeDetail;
    title: string;
}

export const ClassPanel = ({ detail, other, title }: ClassPanelProps) => (
    <DiffCard
        title={title}
        subtitle={detail.label}
        rows={detail.label && !detail.error ? readClassRows(detail, other) : []}
        emptyText={detail.error || (detail.label ? 'No classes on this node.' : 'Select a node to inspect class names.')}
    />
);
