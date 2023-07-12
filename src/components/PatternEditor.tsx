/**
 * Pattern Email Generator
 *
 * @author Afaan Bilal
 * @link   https://afaan.dev/pattern-email-gen
 * @link   https://afaan.dev
 */

import React from 'react';

export type Pattern = {
    key: string;
    prefix: string;
    suffix: string;
    length: number;
    min: number;
    max: number;
};

const PatternEditor: React.FC<{ i: number; pattern: Pattern; onChange: (p: Pattern) => void; onDelete: () => void; }> = ({ i, pattern, onChange, onDelete }) => {
    const updateField = (k: string, v: string | number) => onChange({ ...pattern, [k]: v });

    return (
        <div className="flex flex-col p-2 border border-gray-700 mt-4 rounded">
            <div className="flex justify-between items-center px-2">
                <div className="text-center text-xl text-white mt-4 border-b border-gray-400 pb-2">Pattern #{i + 1}</div>
                {i !== 0 && <button className="text-sm p-2 border border-gray-700 hover:bg-red-950 rounded" title="Remove Pattern" onClick={onDelete}>❌</button>}
            </div>

            <div className="flex p-2 gap-2">
                <div className="flex flex-col flex-1">
                    <label className="text-lg text-white mt-4">Prefix (optional)</label>
                    <input placeholder="Prefix (optional)" value={pattern.prefix} onChange={e => updateField("prefix", e.target.value)} className="text-lg bg-black text-white p-2" />
                </div>

                <div className="flex flex-col flex-1">
                    <label className="text-lg text-white mt-4">Suffix (optional)</label>
                    <input placeholder="Suffix (optional)" value={pattern.suffix} onChange={e => updateField("suffix", e.target.value)} className="text-lg bg-black text-white p-2" />
                </div>
            </div>

            <div className="flex p-2 gap-2">
                <div className="flex flex-col">
                    <label className="text-lg text-white mt-4">Length</label>
                    <input placeholder="Pattern length" type="number" value={pattern.length} onChange={e => updateField("length", parseInt(e.target.value))} className="text-lg bg-black text-white p-2" />
                </div>

                <div className="flex flex-col">
                    <label className="text-lg text-white mt-4">Min</label>
                    <input placeholder="Minimum value" type="number" value={pattern.min} onChange={e => updateField("min", parseInt(e.target.value))} className="text-lg bg-black text-white p-2" />
                </div>

                <div className="flex flex-col">
                    <label className="text-lg text-white mt-4">Max</label>
                    <input placeholder="Maximum value" type="number" value={pattern.max} onChange={e => updateField("max", parseInt(e.target.value))} className="text-lg bg-black text-white p-2" />
                </div>
            </div>
        </div>
    );
};

export default PatternEditor;
