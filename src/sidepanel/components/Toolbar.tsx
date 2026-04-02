import { BrowserTab } from '@/src/sidepanel/types';

interface ToolbarProps {
    leftTabId: number;
    rightTabId: number;
    selector: string;
    loading: boolean;
    tabs: BrowserTab[];
    onInspect: () => void;
    onRefresh: () => void;
    onLeftTabChange: (tabId: number) => void;
    onRightTabChange: (tabId: number) => void;
    onSelectorChange: (value: string) => void;
}

export const Toolbar = ({ leftTabId, rightTabId, selector, loading, tabs, onInspect, onRefresh, onLeftTabChange, onRightTabChange, onSelectorChange }: ToolbarProps) => (
    <section className="toolbar">
        <label className="control"><span>Left tab</span><select className="field" value={leftTabId || ''} onChange={(event) => onLeftTabChange(Number(event.target.value) || 0)}><option value="">Select</option>{tabs.map((tab) => <option key={tab.id} value={tab.id}>{tab.title}</option>)}</select></label>
        <label className="control"><span>Right tab</span><select className="field" value={rightTabId || ''} onChange={(event) => onRightTabChange(Number(event.target.value) || 0)}><option value="">Select</option>{tabs.map((tab) => <option key={tab.id} value={tab.id}>{tab.title}</option>)}</select></label>
        <label className="control"><span>Root selector</span><input className="field" value={selector} onChange={(event) => onSelectorChange(event.target.value)} placeholder="body, #app, .root" /></label>
        <button className="btn subtle" type="button" onClick={onRefresh}>Refresh tabs</button>
        <button className="btn" type="button" disabled={loading} onClick={onInspect}>{loading ? 'Inspecting...' : 'Inspect DOM'}</button>
    </section>
);
