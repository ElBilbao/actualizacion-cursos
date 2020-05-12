$('a[name="verificar"][type="button"]').on('click', function(event) {
  var res = document.getElementById('respuesta').value
  if(res == "" || res == null) {
    alert("Se necesita responder antes de poder verificar la respuesta.")
  } else {
    $('#res').modal('show')
  }
});
