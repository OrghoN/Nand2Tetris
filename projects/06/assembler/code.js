#! /usr/local/bin/node

var dest = {
    'null': '000',
    'M': '001',
    'D': '010',
    'MD': '011',
    'A': '100',
    'AM': '101',
    'AD': '110',
    'AMD': '111'
};

var comp = {
    '0': '0101010',
    '1': '0111111',
    '-1': '0111010',
    'D': '0001100',
    'A': '0110000',
    '!D': '0001101',
    '!A': '0110001',
    '-D': '0001111',
    '-A': '0110011',
    'D+1': '0011111',
    'A+1': '0110111',
    'D-1': '0001110',
    'A-1': '0110010',
    'D+A': '0000010',
    'D-A': '0010011',
    'A-D': '0000111',
    'D&A': '0000000',
    'D|A': '0010101',
    'M': '1110000',
    '!M': '1110001',
    '-M': '1110011',
    'M+1': '1110111',
    'M-1': '1110010',
    'D+M': '1000010',
    'D-M': '1010011',
    'M-D': '1000111',
    'D&M': '1000000',
    'D|M': '1010101'
};

var jump = {
    'null': '000',
    'JGT': '001',
    'JEQ': '010',
    'JGE': '011',
    'JLT': '100',
    'JNE': '101',
    'JLE': '110',
    'JMP': '111'
};

module.exports = {

    getCcode: function(fields, ROMcounter) {
        if (!comp.hasOwnProperty(fields.comp)) {
            console.error("Comp: Syntax error on line " + ROMcounter);
            return "Comp: Syntax error on line " + ROMcounter;
        } else if (!dest.hasOwnProperty(fields.dest)) {
            console.error("Dest: Syntax error on line " + ROMcounter);
            return "Dest: Syntax error on line " + ROMcounter;
        } else if (!jump.hasOwnProperty(fields.jump)) {
            console.error("Jump: Syntax error on line " + ROMcounter);
            return "Jump: Syntax error on line " + ROMcounter;
        }
        return '111' + comp[fields.comp] + dest[fields.dest] + jump[fields.jump];
    },

    getAcode: function(decimalString, ROMcounter) {
        var decimalNum = parseInt(decimalString, 10);

        if (decimalNum < 0 || decimalNum > 24576) {
            console.error("Memory access Error. Call to register " + decimalNum + " on line " + ROMcounter);
            return "Memory access Error. Call to register " + decimalNum + " on line " + ROMcounter;
        }

        var binaryString = decimalNum.toString(2);

        if (binaryString.length > 16) {
            // if larger than 16 bits in binary, truncate the string
            return binaryString.slice(0, 16);
        } else {
            // pad with leading zeros if needed
            while (binaryString.length < 16) {
                binaryString = '0' + binaryString;
            }
            return binaryString;
        }
    }
}
