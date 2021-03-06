

function getstr(str) {
    return str.substring(str.search("html"));
}
function isValid() {
    var url = window.location.href;
    return(url.indexOf("html")!=-1);
}

function getfilename() {
    var url = window.location.href;
    var filename = url.substring(url.lastIndexOf('/') + 1);
    if (filename == "") {
        return "index.html";
    }

    return filename;
}

function getModuloPercentage(){
    var res=0;

    var files=getFiles();
    var url = window.location.href;
    url=url.substr(url.indexOf("html/"));
    var url_split=url.split('/');
    url_split.shift(); // aqui solo se tiene modulo1/modulo2-1.html
    var jsonTmp=files[url_split.shift()]; // se tiene el modulo como objeto
    let nombrePag = url_split[0]; // se saca el nombre de la pagina que se busca
    var totalLevel=100;

    let numPag;
    let thisPage;
    for (page in jsonTmp) {
        thisPage = jsonTmp[page];
        if (thisPage == nombrePag) {
            numPag = parseInt(page);
        }
    }

    totalLevel=totalLevel/Object.keys(jsonTmp).length;

    return (totalLevel * numPag).toFixed(0);

}

function getTotalPercentage(){
    var res=0;

    var files=getFiles();
    var url = window.location.href;
    url=url.substr(url.indexOf("html/"));
    var url_split=url.split('/');
    url_split.shift(); // se deshace del html
    let nombreMod = url_split[0];
    let nombrePag = url_split[1];

    // calcula el numero de paginas que hay
    let numPags = 0;
    let numPagsPasadas = 0;
    let status = true;
    let thisMod;
    let thisPage;
    for (modulo in files) {
        numPags +=  Object.keys(files[modulo]).length;

        if (modulo == nombreMod) {
            thisMod = files[modulo];
            for (pagNum in thisMod) {
                thisPage = thisMod[pagNum];
                console.log(pagNum);
                console.log(thisPage);
                console.log(nombrePag);
                if (thisPage == nombrePag) {
                    numPagsPasadas += parseInt(pagNum);
                    status = false;
                    break;
                }
            }
        }
        else if (status) {
            numPagsPasadas = numPags;
        }
    }
    console.log("pasadas= " + numPagsPasadas);
    return ((numPagsPasadas) / numPags).toFixed(2);
}

function generatePage(name,count){
    var html="";
    if(name=="temario") {
        html += '<a class="btn btn-default" role="button" href="../temario/temario.html"';
    }
    if(name=="index.html"){name="";}
    if(count=="Atrás" || count== "Siguiente"){
        html+='<a class="btn btn-default" role="button" href="./'+name+'">';
    }else{
        html+='<a class="btn btn-default" role="button" id="'+(name==""?"index.html":name)+'" href="./'+name+'">';
    }
    html+='<span>'+count+'</span>';
    html+='</a>';
    return html;
}

function getLast(){
    var url = window.location.href;
    url=url.substr(url.indexOf("html/"));
    var url_split=url.split('/');
    url_split.pop();
    // alert(url_split.join('/'));
    // if(getSpecialLasts().hasOwnProperty(url_split.join('/')))
    //     return getSpecialLasts().url_split.join('/');
    url_split.pop();
    var res="";var flag=false;
    for(var i=url_split.length-1;i>=0;i--){
        if(url_split[i].indexOf("modulo")!=-1){
            flag=true;
            res+="../";
            break;
        }else{
            res+="../";
        }
    }
    if(!flag){
        res+="temario/";
    }
    return res;
}
function getMovementBar(){
    var res=0;

    var files=getFiles();
    var url = window.location.href;
    url=url.substr(url.indexOf("html/"));
    var url_split=url.split('/');
    url_split.shift();

    var jsonTmp=files;
    var idtmp;

    //Get Id
    for(var i=0;i<url_split.length;i++){
        if(!jsonTmp.hasOwnProperty(url_split[i])){
            if(i!=url_split.length-1){break;}
            if(url_split[i]==""){url_split[i]="index.html";}
            for(idtmp in jsonTmp){
                if(jsonTmp[idtmp]==url_split[i]){
                    break;
                }
            }
        }else{
            jsonTmp=jsonTmp[url_split[i]];
        }
    }


    var filescount=Object.keys(jsonTmp).length;

    var html="";var html_back="";
    var count=0;



    //before button
    if(parseInt(idtmp)>1){
        html_back+=generatePage(jsonTmp[parseInt(idtmp)-1],"Atrás");
    }else{
        html_back+=generatePage("temario","Atrás");
    }

    // hay 4 archivos
    var rightmax=filescount-parseInt(idtmp);
    var leftmax=parseInt(idtmp) - 1; // inclusivo con la pag actual
    leftmax = leftmax>=2 ? 2 : leftmax;
    leftmax=rightmax>=2?leftmax:4-rightmax;


    //before overall max 5
    for(var left=parseInt(idtmp) - 1; left > 0 && count<leftmax;left--){
        html=generatePage(jsonTmp[left],left)+html;
        count++;
    }
    html=html_back+html;
    /*
    if(getLast().indexOf("temario")==-1){
        html=html+generatePage(jsonTmp[idtmp],parseInt(idtmp));count++;
    }
    */
    html=html+generatePage(jsonTmp[idtmp],parseInt(idtmp));count++;
    //after overall max 5
    for(var right=parseInt(idtmp) + 1;right<=filescount && count<5;right++){
        html=html+generatePage(jsonTmp[right],right);
        count++;
    }
    //after button
    if(parseInt(idtmp)+1<=filescount){
        html+=generatePage(jsonTmp[parseInt(idtmp)+1],"Siguiente");
    }else{
        html+=generatePage("temario","Siguiente");
    }

    return html;
}

function getFiles() {
    var files = {
        modulo0: {
            1: "modulo0-1.html",
            2: "modulo0-que-1.html",
            3: "modulo0-que-2.html",
            4: "modulo0-que-3.html",
            5: "modulo0-para-1.html",
            6: "modulo0-necesito-1.html",
            7: "modulo0-bases-1.html",
            8: "modulo0-bases-2.html",
            9: "modulo0-bases-3.html",
            10: "modulo0-bases-4.html",
            11: "modulo0-bases-5.html",
            12: "modulo0-bases-6.html",
            13: "modulo0-bases-7.html",
            14: "modulo0-bases-quiz.html",
        },
        modulo1: {
            1: "modulo1-1.html",
            2: "modulo1-seleccionar-1.html",
            3: "modulo1-identificar-1.html",
            4: "modulo1-identificar-2.html",
            5: "modulo1-identificar-3.html",
            6: "modulo1-identificar-4.html",
            7: "modulo1-invitar-1.html",
            8: "modulo1-reunir-1.html",
            9: "modulo1-reunir-1-1.html",
            10: "modulo1-reunir-1-2.html",
            11: "modulo1-problema-1.html",
            12: "modulo1-problema-2.html",
            13: "modulo1-problema-3.html",
            14: "modulo1-quiz-1.html",
            15: "modulo1-quiz-2.html",
            16: "modulo1-quiz-3.html",
        },
        modulo2: {
            1: "modulo2-1.html",
            2: "modulo2-describir-1.html",
            3: "modulo2-representar-1.html",
            4: "modulo2-datos-1.html",
            5: "modulo2-datos-2.html",
            6: "modulo2-datos-3.html",
            7: "modulo2-metas-1.html",
            8: "modulo2-metas-2.html",
            9: "modulo2-quiz-1.html",
        },
        modulo3: {
            1: "modulo3-1.html",
            2: "modulo3-planificar-1.html",
            3: "modulo3-planificar-2.html",
            4: "modulo3-planificar-3.html",
            5: "modulo3-planificar-4.html",
            6: "modulo3-planificar-5.html",
            7: "modulo3-ejecutar-1.html",
            8: "modulo3-analizar-1.html",
            9: "modulo3-analizar-2.html",
            10: "modulo3-analizar-3.html",
            11: "modulo3-quiz-1.html",
        },
        modulo4: {
            1: "modulo4-1.html",
            2: "modulo4-identificar-1.html",
            3: "modulo4-identificar-2.html",
            4: "modulo4-identificar-3.html",
            5: "modulo4-identificar-4.html",
            6: "modulo4-identificar-5.html",
            7: "modulo4-soluciones-1.html",
            8: "modulo4-soluciones-2.html",
            9: "modulo4-soluciones-3.html",
            10: "modulo4-soluciones-4.html",
            11: "modulo4-soluciones-5.html",
            12: "modulo4-soluciones-6.html",
            13: "modulo4-costos-1.html",
            14: "modulo4-costos-2.html",
            15: "modulo4-costos-3.html",
            16: "modulo4-plan-1.html",
            17: "modulo4-plan-2.html",
            18: "modulo4-plan-3.html",
            19: "modulo4-presentar-1.html",
            20: "modulo4-quiz-1.html",
        },
        modulo5: {
            1: "modulo5-1.html",
            2: "modulo5-decidir-1.html",
            3: "modulo5-decidir-2.html",
            4: "modulo5-afinar-1.html",
            5: "modulo5-finalizar-1.html",
            6: "modulo5-finalizar-2.html",
            7: "modulo5-finalizar-3.html",
            8: "modulo5-implementar-1.html",
            9: "modulo5-quiz-1.html",
        },
        modulo6: {
            1: "modulo6-1.html",
            2: "modulo6-evaluar-1.html",
            3: "modulo6-analizar-1.html",
            4: "modulo6-analizar-2.html",
            5: "modulo6-analizar-3.html",
            6: "modulo6-afinar-1.html",
            7: "modulo6-afinar-2.html",
            8: "modulo6-planificar-1.html",
            9: "modulo6-planificar-2.html",
            10: "modulo6-generar-1.html",
            11: "modulo6-generar-2.html",
            12: "modulo6-generar-3.html",
            13: "modulo6-ejecutar-1.html",
            14: "modulo6-crear-1.html",
            15: "modulo6-crear-2.html",
            16: "modulo6-crear-3.html",
            17: "modulo6-crear-4.html",
            18: "modulo6-crear-5.html",
            19: "modulo6-crear-6.html",
            20: "modulo6-quiz-1.html",
        },
    };

    return files;
}


$(document).ready(function(){
    if(isValid()){

        $(".btn-group").html(getMovementBar());
        setTimeout(function(){
            document.getElementById(getfilename()).classList.remove("btn-default");
            document.getElementById(getfilename()).classList.add("btn-actual-page");
        },250);

        show(getTotalPercentage());
        let modulePercentage = getModuloPercentage();
        document.getElementsByClassName("progress-bar")[0].innerHTML = modulePercentage + "%";
        document.getElementsByClassName("progress-bar")[0].style.maxWidth = "" + modulePercentage + "%";
        document.getElementsByClassName("progress-bar")[0].style.minWidth = "" + 5 + "%";

    }

});
