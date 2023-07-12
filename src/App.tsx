/**
 * Pattern Email Generator
 *
 * @author Afaan Bilal
 * @link   https://afaan.dev/pattern-email-gen
 * @link   https://afaan.dev
 */

import React from 'react';

type Pattern = {
    domain: string;
    prefix: string;
    suffix: string;
    length: number;
    min: number;
    max: number;
};

function download(filename: string, text: string) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function App() {
    const [pattern, setPattern] = React.useState<Pattern>({ domain: "", prefix: "", suffix: "", length: 3, min: 1, max: 100 });

    const generate = () => {
        const data: Array<string> = [];

        for (let i = pattern.min; i <= pattern.max; i++) {
            data.push(pattern.prefix + String(i).padStart(pattern.length, '0') + pattern.suffix + '@' + pattern.domain);
        }

        download('emails.csv', data.join('\n'));
    };

    return (
        <div className="h-full py-8 flex flex-col items-center gap-6 font-mono">
            <div className="text-white text-4xl font-extrabold">Skolar</div>
            <div className="flex flex-col max-w-full" style={{ minWidth: "30rem" }}>
                <div className="text-white text-2xl mb-4 text-center py-2 border-b border-b-amber-500">Pattern Email Generator</div>

                {pattern.domain ?
                    <div className="text-white text-md mb-4 text-center p-4 border border-gray-500 flex flex-col items-center">
                        <div className="font-bold mb-2 text-amber-500 border-b border-amber-500">Sample</div>
                        <div className="text-gray-400 text-xl">{pattern.prefix + String(pattern.min).padStart(pattern.length, '0') + pattern.suffix + '@' + pattern.domain}</div>
                    </div> :
                    <div className="text-white text-md mb-4 text-center p-4 border border-gray-500 flex flex-col items-center">
                        <div className="font-bold mb-2 text-amber-500 border-b border-amber-500">Pattern</div>
                        <div className="text-gray-400 text-lg italic">[prefix][pattern][suffix]@[domain]</div>
                    </div>
                }

                <label className="text-lg text-white mt-4">Domain</label>
                <input placeholder="Domain" value={pattern.domain} onChange={e => setPattern({ ...pattern, domain: e.target.value })} className="text-lg bg-black text-white p-2" />

                <label className="text-lg text-white mt-4">Prefix (optional)</label>
                <input placeholder="Prefix (optional)" value={pattern.prefix} onChange={e => setPattern({ ...pattern, prefix: e.target.value })} className="text-lg bg-black text-white p-2" />

                <label className="text-lg text-white mt-4">Suffix (optional)</label>
                <input placeholder="Suffix (optional)" value={pattern.suffix} onChange={e => setPattern({ ...pattern, suffix: e.target.value })} className="text-lg bg-black text-white p-2" />

                <label className="text-lg text-white mt-4">Pattern Length</label>
                <input placeholder="Pattern length" type="number" value={pattern.length} onChange={e => setPattern({ ...pattern, length: parseInt(e.target.value) })} className="text-lg bg-black text-white p-2" />

                <label className="text-lg text-white mt-4">Minimum value</label>
                <input placeholder="Minimum value" type="number" value={pattern.min} onChange={e => setPattern({ ...pattern, min: parseInt(e.target.value) })} className="text-lg bg-black text-white p-2" />

                <label className="text-lg text-white mt-4">Maximum value</label>
                <input placeholder="Maximum value" type="number" value={pattern.max} onChange={e => setPattern({ ...pattern, max: parseInt(e.target.value) })} className="text-lg bg-black text-white p-2" />

                <button className="mt-6 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-lg p-3 text-slate-900" onClick={generate}>Generate</button>
            </div>
            <a href="https://afaan.dev" className="text-gray-400 text-md hover:text-teal-500">&copy; Afaan Bilal</a>
        </div>
    );
}

export default App;
