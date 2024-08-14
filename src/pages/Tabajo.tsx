import { useEffect } from "react";
import Home from "./Home";
import * as Tone from 'tone';
export default function Tabajo2() {
    useEffect(() => {
        const oscillators:Tone.Oscillator[] = [];
        const lfo = new Tone.LFO("2n", 100, 1000).start();
        const envelopes:Tone.AmplitudeEnvelope[] = [];
        for (let i = 0; i < 4; i++) {
            const osc = new Tone.Oscillator(`C${50 + i}`, "sine").start();
            const envelope = new Tone.AmplitudeEnvelope({
                attack: 0.1,
                decay: 0.2,
                sustain: 0.5,
                release: 1
            });
            lfo.connect(osc.frequency);
            osc.connect(envelope);
            envelope.toDestination();

            oscillators.push(osc);
            envelopes.push(envelope);
        }
        envelopes.forEach(env => {
            env.triggerAttackRelease("2n");
        });
        return () => {
            oscillators.forEach(osc => osc.dispose());
            lfo.dispose()
            envelopes.forEach(env => env.dispose());
        };
    }, []);
    return (
        <>
            <Home />
            <h1 className="text-red-300">Hola Mundo</h1>
        </>
    );
}