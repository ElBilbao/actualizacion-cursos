$('input[name="verificar"][type="button"]').on('click', function(event) {
  var elements = document.getElementsByTagName("input")
  var ans = 0.0;

  for (var i = 0; i < elements.length; i++) {
    if(elements[i].checked && elements[i].value != "Obtener Resultados") {
      ans += Number(elements[i].value);
    }
  }

  alert("Has obtenido una puntuación de " + ans);
  //location.replace("modulo1-1.html");
  event.preventDefault();
});
