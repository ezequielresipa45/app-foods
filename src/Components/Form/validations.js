

// Expresion regular validadora de IMAGES URL

export function validationUrl(input) {

    var strongRegex = /(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg)(\?[^\s[",><]*)?/
  
    return strongRegex.test(input);
  }


// Expresion regular validadora de text area minimo 5 caracteres, maximo 100.


export function validationTextArea(input){

    var strongRegex = /^[\s\S]{5,100}$/

    return strongRegex.test(input);
}
