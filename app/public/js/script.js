function CPF(cpf) {
    if (typeof (cpf == "number")) cpf = cpf.toString();
    if (cpf.length > 11) {
        cpf = cpf.replace("-", "");
        cpf = cpf.split(".").join("");
    }
    if (cpf.length > 11 || cpf.length < 11) return false;
    let resultDigit = 0;
    for (let i = 10; i > 1; i--) {
        resultDigit += cpf[10 - i] * i;
    }

    resultDigit = resultDigit % 11 == 0 || resultDigit % 11 == 1 ? 0 : 11 - resultDigit % 11;

    if (resultDigit != cpf[9]) return false;

    resultDigit = 0;

    for (let i = 11; i > 1; i--) {
        resultDigit += cpf[11 - i] * i;
    }

    resultDigit = resultDigit % 11 == 0 || resultDigit % 11 == 1 ? 0 : 11 - resultDigit % 11;

    if (resultDigit != cpf[10]) return false;

    return true;

}
function Password(pass) {
    if (pass.length < 5 || pass.length > 255) return false;
    return true;
}
function confirmPassword(pass, cpass) {
    if (pass === cpass) return true;
    return false;
}
function checkBirthdate(birthdate) {
    if(birthdate == "") return false;

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let b_year = parseInt(birthdate.slice(0,4));
    let b_month = parseInt(birthdate.slice(5,7));
    let b_day = parseInt(birthdate.slice(8,10));
    console.log(b_day, day)
    console.log(b_month, month)
    console.log(b_year - year)
    if(b_year > year || year - b_year > 110 ){
        console.log("ano troll")
    }
    if(b_year == year && b_month > month){
        console.log("mês troll")
    }
    if(b_year == year && b_month == month && b_day > day){
        console.log("Dia burro")
    }
}

function displayMessage(name, form, type, msg) {
    if (document.getElementById(`small-${name}`)) {
        form.removeChild(form.lastChild);
    }
    let small = document.createElement("small");
    if (type == true) {
        small.innerText = `${name} ${msg}`;
        small.className = "text-success";
        small.id = `small-${name}`;
        form.appendChild(small);
    } else {
        small.innerText = `${name} ${msg}`;
        small.className = "text-danger";
        small.id = `small-${name}`;
        form.appendChild(small);
    }
}

function validate() {
    let forms = document.getElementsByClassName("form-group")
    let name = document.getElementById("name").value;
    let cpf = document.getElementById("cpf").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirm_password = document.getElementById("confirm_password").value;
    let birthdate = document.getElementById("birthdate").value;
    let error = 0;

    if (CPF(cpf) === false) {
        displayMessage("CPF", forms[1], false, "inválido");
        error = 1;
    } else {
        displayMessage("CPF", forms[1], true, "válido");
    }

    if (Password(password) === false) {
        displayMessage("Senha", forms[3], false, "inválida");
        error = 1;
    } else {
        displayMessage("Senha", forms[3], true, "válida");
    }

    if (confirmPassword(password, confirm_password) === false) {
        displayMessage("Senhas", forms[4], false, "diferentes");
        error = 1;
    } else {
        displayMessage("Senhas", forms[4], true, "compatíveis");
    }

    if (checkBirthdate(birthdate) === false) {

    } else {

    }

    if (error == 1) {
        return false;
    } else {
        document.getElementById("form").submit();
    }

}

// Calculando a idade de cada usuário encontrado e imprimindo-as na tabela
window.onload = function() {
    const birthdateTd = document.querySelectorAll('.birthdateTd');
    birthdateTd.forEach(element => {
        const birthdate = new Date(parseInt(element.dataset.year), parseInt(element.dataset.month), parseInt(element.dataset.date));
        const now = new Date();
        element.innerText = Math.floor((now - birthdate) / (1000 * 3600 * 24 * 365.25));
    });
}

// MÁSCARAS
$('#cpf').mask('999.999.999-99');
$('#phone').mask('(99) 9999-9999');