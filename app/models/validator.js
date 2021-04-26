class Validator{
    static CPF(cpf) {
        if (typeof (cpf == "number")) cpf = cpf.toString();
        if (cpf.length > 11) {
            cpf = cpf.replace("-", "");
            cpf = cpf.split(".").join("");
        }
        if (cpf.length > 11 || cpf.length < 11) return false;
        if (cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999") return false;
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

    static checkBirthdate(birthdate){
        let date = new Date();                                                         
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let b_year = parseInt(birthdate.slice(0, 4));                                       
        let b_month = parseInt(birthdate.slice(5, 7));
        let b_day = parseInt(birthdate.slice(8, 10));
        if (b_year > year || year - b_year > 110) return false;
        if (b_year == year && b_month > month) return false;
        if (b_year == year && b_month == month && b_day > day) return false;
        return true;
    }

    // static validate(dados, confirm_password, type = true) {
    static validate(dados, confirm_password, type = true) {
        const regexName = /^[A-ZÀ-Ÿ][A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-ZÀ-Ÿ][A-zÀ-ÿ']+$/;        //Expressão regular (regex)
        const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        dados.phone = dados.phone.replace(/[^0-9]/g,'');
        let error = {};
        if (dados.name == "") error.name = "Nome obrigatório";
        else if (dados.name.length < 3 || regexName.test(dados.name) == false) error.name = "Nome inválido";
    
        if (dados.cpf == "") error.cpf = "CPF obrigatório";
        else if (Validator.CPF(dados.cpf) == false) error.cpf = "CPF inválido";
    
        if (dados.email == "") error.email = "Email obrigatório";
        else if ((regexEmail.test(dados.email) == false)) error.email = "Email inválido";
        
        if (type == true) {
            if (dados.password == "") error.password = "Senha obrigatória";
            else if (dados.password.length < 5 || dados.password.length > 255) error.password = "Senha inválida";
    
            if (confirm_password == "" && dados.password != confirm_password) error.confirm_password = "É obrigatório confirmar a senha";
            else if (dados.password != confirm_password) error.confirm_password = "Senhas diferentes";
        } else{
            if(dados.password) error.confirm_password = "É obrigatório confirmar a senha";
            if(confirm_password) error.password = "Senha obrigatória";
        }
        
        if (Validator.checkBirthdate(dados.birthdate) == false) error.birthdate = "Data inválida";
        if(dados.phone == "") error.phone = "Telefone obrigatório";
        else if(dados.phone.length < 10 || dados.phone.length > 11) error.phone = "Telefone inválido";
        
        return error;
    }

}
module.exports = () => Validator;

