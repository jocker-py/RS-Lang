function renderSvg():string {
  return `<svg id="svg1" xmlns="http://www.w3.org/2000/svg" 
  xmlns:xlink="http://www.w3.org/1999/xlink"   
   width="200" height="200" viewBox="0 0 120 120" >  
    <rect width="100%" height="100%" />
  <circle id='in' cx="60" cy="60" r="50" stroke="#f8a305be" stroke-width="8"/>
  <circle class='out' cx="60" cy="60" r="50" transform="rotate(-90 60 60)" stroke-width="8" >
   </circle>
</svg>  `;
}

export default renderSvg;