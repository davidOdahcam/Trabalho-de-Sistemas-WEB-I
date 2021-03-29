function CPF(cpf){
    if(typeof(cpf == "number")) cpf = cpf.toString();
    if(cpf.length > 11) {
        cpf = cpf.replace("-", "");
        cpf = cpf.split(".").join("");
    }
    if(cpf.length > 11 || cpf.length < 11) return false;
    let resultDigit = 0;
    for(let i = 10; i > 1; i--) {
        resultDigit += cpf[10-i] * i;
    } 

    resultDigit = resultDigit % 11 == 0 || resultDigit % 11 == 1 ? 0 : 11 - resultDigit % 11;

    if(resultDigit != cpf[9]) return false;

    resultDigit = 0;

    for(let i = 11; i > 1; i--) {
        resultDigit += cpf[11-i] * i;
    }

    resultDigit = resultDigit % 11 == 0 || resultDigit % 11 == 1 ? 0 : 11 - resultDigit % 11;

    if(resultDigit != cpf[10]) return false;

    return true;

}
function Password(pass){
    if(pass.length<5 || pass.length>255) return false;
    return true;
}
function confirmPassword(pass,cpass){
    if(pass === cpass) return true;
    return false;
}
function birthdate(date){

}

function displayMessage(name,form,type,msg){
    if(document.getElementById(`small-${name}`)){
        form.removeChild(form.lastChild);
    }
    let small = document.createElement("small");
    if(type == true){
        small.innerText =`${name} válido`;
        small.className = "text-success";
        small.id = `small-${name}`;
        form.appendChild(small);
    }else{
        small.innerText =`${name} inválido`;
        small.className = "text-danger";
        small.id = `small-${name}`;
        form.appendChild(small);
    }
}

function validate(){
    let forms = document.getElementsByClassName("form-group")
    let name = document.getElementById("name").value;
    let cpf = document.getElementById("cpf").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirm_password = document.getElementById("confirm_password").value;
    let birthdate = document.getElementById("birthdate").value;
    let error = 0;

    if(CPF(cpf) === false){
        displayMessage("CPF",forms[1],false,"CPF inválido")
        error = 1;
    }else{
        displayMessage("CPF",forms[1],true)
    }if(Password(password) === false){
        console.log("senha invalida");
        error = 1;
    }if(confirmPassword(password,confirm_password) === false){
        console.log("senha incompativel");
        error = 1;
    }
    
    if(error == 1){
        return false;
    }else{
        document.getElementById("form").submit();
    }   

}