/**
 * Pattern Email Generator
 *
 * @author Afaan Bilal
 * @link   https://afaan.dev/pattern-email-gen
 * @link   https://afaan.dev
 */

import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import PatternEditor, { Pattern } from './components/PatternEditor';

function download(filename: string, text: string) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

const blankPattern = () => ({ key: uuidv4(), prefix: "", suffix: "", length: 3, min: 1, max: 100 });
const makePattern = (p: Pattern, j: number) => p.prefix + String(j).padStart(p.length, '0') + p.suffix;

function App() {
    const [domain, setDomain] = React.useState('');
    const [patterns, setPatterns] = React.useState<Pattern[]>([blankPattern()]);

    const addPattern = () => { setPatterns(prev => [...prev, blankPattern()]); };

    const generate = () => {
        const data: Array<string> = [];

        if (patterns.length == 1) {
            for (let i = 0; i < patterns[0].max; i++) {
                data.push(makePattern(patterns[0], i) + '@' + domain);
            }
        } else if (patterns.length == 2) {
            for (let i = 0; i < patterns[0].max; i++) {
                const p1 = makePattern(patterns[0], i);

                for (let j = patterns[1].min; j <= patterns[1].max; j++) {
                    const p2 = makePattern(patterns[1], j);
                    data.push(p1 + p2 + '@' + domain);
                }
            }
        } else {
            for (let i = 0; i < patterns[0].max; i++) {
                const p1 = makePattern(patterns[0], i);

                for (let j = patterns[1].min; j <= patterns[1].max; j++) {
                    const p2 = makePattern(patterns[1], j);

                    for (let k = patterns[2].min; k <= patterns[2].max; k++) {
                        const p3 = makePattern(patterns[2], k);
                        data.push(p1 + p2 + p3 + '@' + domain);
                    }
                }
            }
        }

        download('emails.csv', data.join('\n'));
    };

    return (
        <div className="h-full py-12 flex flex-col items-center gap-6 font-mono">
            <div className="text-white text-4xl font-extrabold">Skolar</div>
            <div className="flex flex-col max-w-full">
                <div className="text-white text-2xl mb-4 text-center py-2 border-b border-b-amber-500">Pattern Email Generator</div>

                <div className="text-white text-md mb-4 text-center p-4 border border-gray-500 flex flex-col items-center rounded">
                    <div className="font-bold mb-2 text-amber-500 border-b border-amber-500">Pattern</div>
                    <div className="text-gray-400 text-sm md:text-lg">
                        <div className="bg-neutral-900 p-2">
                            Pattern: [prefix][numeric][suffix]
                        </div>
                        <div className="bg-slate-900 p-2 mt-2">
                            {patterns.map((_, i) => `[pattern#${i + 1}]`).join('')}@[domain]
                        </div>
                    </div>
                </div>
                <div className="text-white text-md mb-4 text-center p-4 border border-gray-500 flex flex-col items-center rounded">
                    <div className="font-bold mb-2 text-amber-500 border-b border-amber-500">Sample</div>
                    <div className="bg-slate-900 text-gray-400 p-2 text-sm md:text-xl">
                        {patterns.map(p => p.prefix + String(p.min).padStart(p.length, '0') + p.suffix).join('') + '@' + (domain || "skolar.in")}
                    </div>
                </div>

                <label className="text-xl text-white mt-4">Domain</label>
                <input placeholder="skolar.in" value={domain} onChange={e => setDomain(e.target.value)} className="text-xl bg-black text-white p-2" />

                <div className="border-b border-b-amber-600 w-full mt-4"></div>

                <div className="flex flex-col justify-center items-center">
                    {patterns.map((pat, i) =>
                        <PatternEditor
                            key={pat.key} i={i}
                            pattern={pat}
                            onDelete={() => setPatterns(prev => prev.filter((_, index) => i !== index))}
                            onChange={p => { const pCopy = structuredClone(patterns); pCopy[i] = p; setPatterns(pCopy); }}
                        />
                    )}
                </div>

                {patterns.length < 2 &&
                    <div className="flex justify-end">
                        <button className="mt-6 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-sm p-3 text-slate-900 w-40" onClick={addPattern}>Add Pattern</button>
                    </div>
                }

                <div className="border-b border-b-amber-600 w-full mt-4"></div>

                <button className={"mt-6 text-lg p-3 text-slate-900 " + (!domain ? "bg-gray-400 text-gray-400" : "bg-amber-500 hover:bg-amber-600 active:bg-amber-700")} disabled={!domain} onClick={generate}>Generate</button>
            </div>
            <div className="py-8 flex text-gray-400 gap-4">
                <a href="https://afaan.dev" className="text-md hover:text-teal-500">&copy; Afaan Bilal</a>
                &middot;
                <a href="https://afaan.dev" className="text-md hover:text-teal-500">afaan.dev</a>
            </div>
        </div>
    );
}

export default App;
