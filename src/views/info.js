<script>
   function enseña(){
     
    let cambia= document.body.getElemementById("ehm");
    cambia.classList.toggle('menuinfo');
    let html=`<div>
    <button  type="button" class="btn btn-secondary" onclick="">¿Qué es tarup?</button>
    <button  type="button" class="btn btn-secondary" onclick="">Mision</button> 
    <button  type="button" class="btn btn-secondary" onclick="">Vision</button>
  </div>`;
    muestraresultado(html);
   
  }
   
 const muestraresultado=(botones)=>document.getElementById('ehm').innerHTML=botones;
 </script>