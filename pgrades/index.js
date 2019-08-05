window.onload = (function () {
    LinkHandlers();
});

function LinkHandlers() {
    document.getElementById("button_calculate").onclick = Calculate;
}

function InputAsNumber(id) {
    var text = document.getElementById(id).value.trim();
    text.replace(",", ".");
    var as_number = parseFloat(text);
    return ValidNumbers(as_number) ? as_number : NaN;
}

function SetInput(id, v) {
    let elem = document.getElementById(id);
    elem.value = v.toFixed(2);

    elem.style.backgroundColor = "#7FFF00";
    setTimeout(
        function() {
            elem.style.backgroundColor = "white";
        },
        400
    );
}

function GetP1() {
    return InputAsNumber("input_p1");
}

function GetP2() {
    return InputAsNumber("input_p2");
}

function GetP3() {
    return InputAsNumber("input_p3");
}

function GetMF() {
    return InputAsNumber("input_mf");
}

function GetPesos() {
    var text = document.getElementById("select_pesos").value.trim();
    var pesos = text.split(" ").map(Number);
    return pesos;
}

function ValidNumbers() {
    for (var i = 0; i < arguments.length; i++) {
        if (isNaN(arguments[i])) {
            return false;
        }
    }
    return true;
}

function Calculate() {
    let p1 = GetP1();
    let p2 = GetP2();
    let p3 = GetP3();
    let mf = GetMF();
    let pesos = GetPesos();
    let w1 = pesos[0];
    let w2 = pesos[1];
    let w3 = pesos[2];
    let w4 = pesos[3];

    let p1w1 = ValidNumbers(p1, w1) ? (p1 * w1) : NaN;
    let p2w2 = ValidNumbers(p2, w2) ? (p2 * w2) : NaN;
    let p3w3 = ValidNumbers(p3, w3) ? (p3 * w3) : NaN;
    let mfw4 = ValidNumbers(mf, w4) ? (mf * w4) : NaN;

    if (ValidNumbers(p1w1, p2w2, p3w3, w4)) {
        let total = (p1w1 + p2w2 + p3w3) / w4;
        SetInput("input_mf", total);
        return true;
    }

    if (ValidNumbers(mfw4, p1w1, p2w2, w3)) {
        let needed_p3 = (mfw4 - p1w1 - p2w2) / w3;
        SetInput("input_p3", needed_p3);
        return true;
    }

    if (ValidNumbers(mfw4, p2w2, p3w3, w1)) {
        let needed_p1 = (mfw4 - p2w2 - p3w3) / w1;
        SetInput("input_p1", needed_p1);
        return true;
    }

    if (ValidNumbers(mfw4, p1w1, p3w3, w2)) {
        let needed_p2 = (mfw4 - p1w1 - p3w3) / w2;
        SetInput("input_p2", needed_p2);
        return true;
    }

    alert("Informações insuficientes ou inválidas");

    return false;
}
