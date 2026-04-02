import { DiffRow, NodeDetail } from '@/src/sidepanel/types';

export const trackedStyleNames = [
    'display', 'position', 'width', 'height', 'margin', 'padding', 'gap',
    'color', 'background-color', 'font-size', 'font-weight', 'line-height',
    'border', 'border-radius', 'box-shadow', 'opacity', 'flex', 'grid-template-columns'
];

const readTone = (value: string, other: string): DiffRow['tone'] => {
    if (value === other) return 'base';
    if (value) return 'warn';
    return 'danger';
};

export const readClassRows = (detail: NodeDetail, other: NodeDetail): DiffRow[] => {
    const names = [...detail.classes, ...other.classes.filter((name) => !detail.classes.includes(name))];
    return names.map((name) => ({ name, value: name, tone: readTone(detail.classes.includes(name) ? name : '', other.classes.includes(name) ? name : '') }));
};

export const readStyleRows = (detail: NodeDetail, other: NodeDetail): DiffRow[] =>
    trackedStyleNames
        .map((name) => ({ name, value: detail.styles[name] || '', tone: readTone(detail.styles[name] || '', other.styles[name] || '') }))
        .filter((row) => row.value || other.styles[row.name] || '');
