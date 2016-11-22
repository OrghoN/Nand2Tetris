#! /usr/local/bin/node

var condition = {
    ">=": "JGE",
    "!=": "JNE",
    "<=": "JLE",
    ">": "JGT",
    "=": "JEQ",
    "<": "JLT",
}


function jumpType(cond) {
    var jmp;
    Object.keys(condition).forEach(function(key) {
        if (cond.includes(key)) {
            jmp = (key);
        }
    });
    return jmp;
}

function setAinstruction(value) {
    return "@" + value + "\n"
}

function negativeNumberHandling(value) {
    if (value < 0) {
        return setAinstruction(Math.abs(value)) + "D=-A" + "\n";
    } else {
        return setAinstruction(value) + "D=A" + "\n";
    }
}
module.exports = {
    macroType: function(str) {
        if (str.includes("IF")) {
            return "I";
        } else if (str.includes("GOTO")) {
            return "G";
        } else {
            return "E";
        }
    },

    breakdownIinstruction: function(str) {
        str = str.slice(1).split("IF");
        str = str[1].split("GOTO");

        jmp = jumpType(str[0]);
        cond = str[0].split(jmp);
        jmp = condition[jmp];

        if (cond[1] == 0) {
            return setAinstruction(cond[0]) + "D=M" + "\n" + setAinstruction(str[1]) + "D;" + jmp;
        }
        //if number
        else if (Number.isInteger(parseInt(cond[1]))) {
            return negativeNumberHandling(parseInt(cond[1])) + setAinstruction(cond[0]) + "D=M-D" + "\n" + setAinstruction(str[1]) + "D;" + jmp;
        }
        //if label
        else {
            return setAinstruction(cond[1]) + "D=M" + "\n" + setAinstruction(cond[0]) + "D=M-D" + "\n" + setAinstruction(str[1]) + "D;" + jmp;
        }

    },

    breakdownGinstruction: function(str) {
        str = str.slice(1).split("GOTO");
        return "@" + str[1] + "\n" + "0;JMP";
    },

    breakdownEinstruction: function(str) {
        var computation = null;
        var sign = null;
        str = str.slice(1).split("=");
        var v = 0;
        var c = 1;
        //if number
        if (Number.isInteger(parseInt(str[1]))) {
            return negativeNumberHandling(parseInt(str[1])) + setAinstruction(str[0]) + "M=D";
        }
        //expression check
        else if (str[1].includes("+")) {
            sign = "D=D+M"
            computation = str[1].split("+");
        } else if (str[1].includes("-")) {
            sign = "D=M-D"
            computation = str[1].split("-");
        }

        if (computation == null) {
            return setAinstruction(str[1]) + "D=M" + "\n" + setAinstruction(str[0]) + "M=D";
        } else if (Number.isInteger(parseInt(computation[0])) || Number.isInteger(parseInt(computation[1]))) {
            return negativeNumberHandling(parseInt(computation[1])) + setAinstruction(computation[0]) + sign + "\n" +  setAinstruction(str[0]) + "M=D";
        }
        else{
          return setAinstruction(computation[1]) + "D=M" + "\n" + setAinstruction(computation[0]) + sign + "\n" +  setAinstruction(str[0]) + "M=D";
        }

        return "###" + computation;
    }


}
