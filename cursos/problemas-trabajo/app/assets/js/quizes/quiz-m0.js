$('input[name="verificar"][type="button"]').on('click', function(event) {
  var elements = document.getElementsByTagName("input")
  var ans = 0.0;

  for (var i = 0; i < elements.length; i++) {
    if(elements[i].checked && elements[i].value != "Obtener Resultados") {
      ans += Number(elements[i].value);
    }
  }

  alert("Has obtenido una puntuación de " + ans + "\n\n¡Felicitaciones! El completar esta valoración corroboras tu deseo de desarrollar el desempeño de tus propias metas. Tu puntaje refleja en dónde te encuentras en este momento. En todos los casos hay siempre oportunidad de poder construir tu capacidad de desempeño.");
  alert("Este curso te ayudará significativamente a desarrollar tus conocimientos y habilidades de comunicación interpersonal. Es momento de comenzar.");
  location.replace("modulo1-1.html");
  event.preventDefault();
});
