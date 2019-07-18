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

    if (ValidNumbers(p1, p2, p3)) {
        let total = ((4 * p1) + (4 * p2) + (2 * p3)) / 10;
        SetInput("input_mf", total);
        return true;
    }

    if (ValidNumbers(p1, p2, mf)) {
        let needed_p3 = (10 * mf - (4 * p1) - (4 * p2)) / 2;
        SetInput("input_p3", needed_p3);
        return true;
    }

    if (ValidNumbers(p2, p3, mf)) {
        let needed_p1 = (10 * mf - (4 * p2) - (2 * p3)) / 4;
        SetInput("input_p1", needed_p1);
        return true;
    }

    if (ValidNumbers(p1, p3, mf)) {
        let needed_p2 = (10 * mf - (4 * p1) - (2 * p3)) / 4;
        SetInput("input_p2", needed_p2);
        return true;
    }

    alert("Informações insuficientes ou inválidas");

    return false;
}
