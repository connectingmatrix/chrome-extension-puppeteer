import { useDeferredValue, useState } from 'react';
import { DiffRow } from '@/src/sidepanel/types';

interface DiffCardProps {
    emptyText: string;
    rows: DiffRow[];
    subtitle: string;
    title: string;
}

export const DiffCard = ({ emptyText, rows, subtitle, title }: DiffCardProps) => (
    <DiffCardBody emptyText={emptyText} rows={rows} subtitle={subtitle} title={title} />
);

const DiffCardBody = ({ emptyText, rows, subtitle, title }: DiffCardProps) => {
    const [search, setSearch] = useState('');
    const query = useDeferredValue(search).trim().toLowerCase();
    const filtered = query
        ? rows.filter((row) => `${row.name} ${row.value}`.toLowerCase().includes(query))
        : rows;
    return (
        <section className="panel">
            <div className="panel-head">
                <strong>{title}</strong>
                <span>{subtitle}</span>
            </div>
            <input className="field panel-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search values" />
            <div className="diff-grid panel-scroll">
                {filtered.length
                    ? filtered.map((row) => (
                          <div key={row.name} className={`diff-row ${row.tone}`}>
                              <strong>{row.name}</strong>
                              <span>{row.value || 'unset'}</span>
                          </div>
                      ))
                    : <div className="empty">{rows.length ? 'No values match this search.' : emptyText}</div>}
            </div>
        </section>
    );
};
