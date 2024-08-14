import * as Tone from 'tone';


export default function Class8() {

    function toque() {
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease("C4", "8n");
        console.log("toque");
    }
    return (
        < >
            <input></input>
            <button onClick={(toque)}>asdasd</button>
        </ >
    );
}