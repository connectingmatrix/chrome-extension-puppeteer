import { DiffCard } from '@/src/sidepanel/components/DiffCard';
import { readStyleRows } from '@/src/sidepanel/lib/style-diff';
import { NodeDetail } from '@/src/sidepanel/types';

interface StylePanelProps {
    title: string;
    detail: NodeDetail;
    other: NodeDetail;
}

export const StylePanel = ({ title, detail, other }: StylePanelProps) => (
    <DiffCard
        title={title}
        subtitle={detail.label}
        rows={detail.label && !detail.error ? readStyleRows(detail, other) : []}
        emptyText={detail.error || (detail.label ? 'No computed styles on this node.' : 'Select a node to inspect computed styles.')}
    />
);
