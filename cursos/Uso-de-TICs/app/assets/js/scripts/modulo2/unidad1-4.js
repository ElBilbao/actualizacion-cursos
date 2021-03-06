function getPreguntas() {
    $("#ej1").on("click", function(event) {
        event.preventDefault();
        // Get preguntas
        for (let i = 1; i <= 4; i++) {
            if ($(`input[type=radio][name=pregunta${i}]:checked`).val() == 'correct') {
                $(`#ans${i}`).css("color", "green")
                $(`#ans${i}`).text("¡Correcto!").show();
            }
            else {
                $(`#ans${i}`).css("color", "red")
                $(`#ans${i}`).text("Incorrecto, intenta de nuevo.").show();
            }
        }

    });
}

function watchForm() {
    for (let i = 1; i <= 5; i++) {
        $(`input[type=radio][name=pregunta${i}]`).on("change", function(event){
            $(`#ans${i}`).hide();
        });
    }
}

function init() {
    getPreguntas();
    watchForm();
}

init();