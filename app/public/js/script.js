function Name(name) {
    const regex = /[0-9]/;
    if (name == "") return null;
    if (name.length < 3) return false;
    if (regex.test(name)) return false;
    return true;
}
function CPF(cpf) {
    console.log(cpf)
    //if (cpf == "") return null;   
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
function Email(email) {
    if (email == "") return null;
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function Password(pass) {
    if (pass == "") return null;
    if (pass.length < 5 || pass.length > 255) return false;
    return true;
}
function confirmPassword(pass, cpass) {
    if (pass === cpass) return true;
    return false;
}
function checkBirthdate(birthdate) {
    if (birthdate == "") return null;
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let b_year = parseInt(birthdate.slice(0, 4));
    let b_month = parseInt(birthdate.slice(5, 7));
    let b_day = parseInt(birthdate.slice(8, 10));
    console.log(birthdate)
    if (b_year > year || year - b_year > 110) return false

    if (b_year == year && b_month > month) return false

    if (b_year == year && b_month == month && b_day > day) return false

    return true;
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
function empty(name, cpf, email, password, confirm_password, birthdate) {

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
    console.log(Email(email))
    if (Name(name) === false) {
        displayMessage("Nome", forms[0], false, "inválido");
        error = 1;
    } else if (Name(name) === null) {
        displayMessage("Nome", forms[0], null, "obrigatório");
        error = 1;
    } else {
        displayMessage("Nome", forms[0], true, "válido");
    }
    if (CPF(cpf) === false) {
        displayMessage("CPF", forms[1], false, "inválido");
        error = 1;
    } else if (CPF(cpf) === null) {
        displayMessage("CPF", forms[1], null, "obrigatório");
        error = 1;
    } else {
        displayMessage("CPF", forms[1], true, "válido");
    }
    if(Email(email) === false){
        displayMessage("Email", forms[2], false, "inválido");
        error = 1;
    }else if (Email(email) === null) {
        displayMessage("Email", forms[2], null, "obrigatório");
        error = 1;
    }else{
        displayMessage("Email", forms[2], true, "válido");
    }

    if (Password(password) === false) {
        displayMessage("Senha", forms[3], false, "inválida");
        error = 1;
    } else if (Password(password) === null) {
        displayMessage("Senha", forms[3], null, "obrigatória");
        error = 1;
    } else {
        displayMessage("Senha", forms[3], true, "válida");
    }

    if (confirmPassword(password, confirm_password) === false && Password(password) === true) {
        displayMessage("Senhas", forms[4], false, "diferentes");
        error = 1;
    } else if (confirmPassword(password, confirm_password) === true && Password(password) === true) {
        displayMessage("Senhas", forms[4], true, "compatíveis");
    }

    if (checkBirthdate(birthdate) === false) {
        displayMessage("Data", forms[5], false, "de nascimento inválida");
        error = 1;
    } else if (checkBirthdate(birthdate) === true) {
        displayMessage("Data", forms[5], true, "de nascimento válida");
    }

    if (error == 1) {
        return false;
    } else {
        document.getElementById("form").submit();
    }

}

// MÁSCARAS
$('#cpf').mask('999.999.999-99');
$('#phone').mask('(99) 99999-9999');
