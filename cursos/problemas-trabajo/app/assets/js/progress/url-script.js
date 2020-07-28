

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
            2: "modulo0-bases-1.html",
            3: "modulo0-bases-2.html",
            4: "modulo0-bases-3.html",
            5: "modulo0-bases-4.html",
            6: "modulo0-bases-5.html",
            7: "modulo0-bases-6.html",
            8: "modulo0-bases-7.html",
            9: "modulo0-bases-quiz.html",
            10: "modulo0-necesito-1.html",
            11: "modulo0-para-1.html",
            12: "modulo0-que-1.html",
            13: "modulo0-que-2.html",
            14: "modulo0-que-3.html",
        },
        modulo1: {
            1: "modulo1-1.html",
            2: "modulo1-2.html",
            3: "modulo1-3.html",
            4: "modulo1-4.html",
            5: "flip-cards.html",
            6: "carousel.html",
            7: "carousel2.html",
            8: "select-ejemplo-actividad.html",
            9: "actividad.html",
            10: "CARD-QUIZ.html",
        },
        modulo2: {
            1: "modulo2-1.html",
            2: "modulo2-2.html",
        },
        modulo3: {
            1: "modulo3-1.html",
            2: "modulo3-2.html",
        },
        modulo4: {
            1: "modulo4-1.html",
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
