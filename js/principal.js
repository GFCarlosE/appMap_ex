var form = document.getElementById("formulario")

form.addEventListener("submit",(e)=>{
    //Inicialización de variables con datos escrito
    const nombre = String(document.getElementById('nombre').value);
    const latitud = String(document.getElementById('latitud').value);
    const longitud = String(document.getElementById('longitud').value);
    const latitudNumero = parseFloat(latitud)
    const longitudNumero = parseFloat(longitud)
    localStorage.setItem("textvalue1",nombre)
    localStorage.setItem("textvalue2",latitud)
    localStorage.setItem("textvalue3",longitud)

    //Condicional para evitar despliegue en caso de salirse de la zona de cobertura del servicio
    if(latitudNumero < -11324553.92342625 || 
        latitudNumero > -11320553.92342625 || 
        longitudNumero > 2411365.884843269 || 
        longitudNumero < 2408665.884843269){
        e.preventDefault()
        alert("Lo sentimos, las coordenadas introducidas no están dentro de la zona de servicio de la universidad.")
    }
    //Función para llamar elemntos del HTML por id
    function el(id) {
        return document.getElementById(id);
    }
    //Vaciar campos del HTML
    el('nombre').innerHTML = ""
    el('latitud').innerHTML = ""
    el('longitud').innerHTML = ""
    
}
)








