// Analog controls: original compressor inputs and compress() are retained.
window.addEventListener('DOMContentLoaded',()=>{
 document.querySelectorAll('.knob').forEach(knob=>{
  const input=document.getElementById(knob.dataset.target),output=document.getElementById(input.id+'_display');
  const min=Number(input.min),max=Number(input.max),step=Number(input.step)||1;
  const update=()=>{const val=Number(input.value);knob.querySelector('.knob-face').style.transform=`rotate(${-135+270*(val-min)/(max-min)}deg)`;output.textContent=(input.id==='ratio_text'||input.id==='thresh_text'||input.id==='gain_text'?Math.round(val):val)+input.dataset.unit;knob.setAttribute('aria-valuenow',String(val));};
  const set=v=>{v=Math.max(min,Math.min(max,Math.round((v-min)/step)*step+min));input.value=String(Number(v.toFixed(4)));input.dispatchEvent(new Event('input',{bubbles:true}));update();};
  let initialY=0,initialValue=0;
  knob.addEventListener('pointerdown',e=>{if(e.button!==0)return;initialY=e.clientY;initialValue=Number(input.value);knob.setPointerCapture(e.pointerId);e.preventDefault();});
  knob.addEventListener('pointermove',e=>{if(!knob.hasPointerCapture(e.pointerId))return;set(initialValue+(initialY-e.clientY)*(max-min)/180);});
  knob.addEventListener('wheel',e=>{e.preventDefault();set(Number(input.value)+(e.deltaY<0?step:-step));},{passive:false});
  knob.addEventListener('keydown',e=>{if(['ArrowUp','ArrowRight','ArrowDown','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();set(e.key==='Home'?min:e.key==='End'?max:Number(input.value)+(['ArrowUp','ArrowRight'].includes(e.key)?step:-step));}});
  input.addEventListener('input',update);update();
 });
 resizeWaveform();
});
