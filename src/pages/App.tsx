import { ChangeEvent, useRef, useState } from 'react';
import './App.css';
import * as Tone from 'tone';
import styles from './home.module.css'

import * as d3 from 'd3';
import Home from './Home';

function App() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [numeros, setNumeros] = useState<number[]>([100, 115, 120, 115]);


  function toque() {
    const synth = new Tone.PolySynth(Tone.FMSynth).toDestination();
    const now = Tone.now();
    synth.triggerAttackRelease([numeros[0], numeros[1], numeros[2], numeros[3]], 1, now);
    synth.triggerAttackRelease([125], .5, now + 1);
    synth.triggerAttackRelease([80], .5, now + 1.5);
    const analyser = new Tone.Analyser('waveform', 1024);
    synth.connect(analyser);

    visualize(analyser);
  }

  function visualize(analyser: Tone.Analyser) {
    const svg = d3.select(svgRef.current);
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    svg.selectAll('*').remove(); // Clear previous visualization

    const xScale = d3.scaleLinear().domain([0, 1024]).range([0, width]);
    const yScale = d3.scaleLinear().domain([-1, 1]).range([height, 0]);

    function draw() {
      const dataArray: Float32Array = analyser.getValue() as Float32Array;

      const line = d3.line<number>()
        .x((_d, i) => xScale(i))
        .y(d => yScale(d as number))
        .curve(d3.curveBasis);

      svg.selectAll('path')
        .data([Array.from(dataArray)])
        .join('path')
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue');

      requestAnimationFrame(draw);
    }

    draw();

  }
  const handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    const newNumeros = [...numeros];
    newNumeros[index] = newValue;
    setNumeros(newNumeros);
  };
  return (
    <>

      <Home />
      <div className='flex flex-col items-center justify-evenly h-screen'>
        {numeros.map((numero, index) => (
          
            <input className={`${styles.intup}`}
              type="number"
              key={String(numero)}
              value={numero}
              onChange={handleChange(index)}
            />
        ))}
        <button onClick={toque} className={`${styles.button}`}>Click</button>
        <svg ref={svgRef} width="800" height="400"></svg>
      </div>
    </>
  );
}

export default App;
