#! /usr/local/bin/node

//load modules
parse = require('./parser');
code = require('./code');
symbolTable = require('./symbolTable');
macro = require('./macro');

var table = new symbolTable.symbolTable();
var ROMcounter = 0;
var RAMcounter = 16;

//load program
fs = require('fs')
fs.readFile(process.argv[2], {
    encoding: 'utf8',
    normalize: true
}, function(err, data) {
    if (err) {
        return console.log(err);
    }
    console.log(module.exports.assemble(data));
});

module.exports = {
    assemble: function(program) {
        var assemblerOutput = '';
        program = parse.removeComments(program).trim();
        var instructions = program.split('\n');
        var macroInst = null;

        //first pass
        instructions.forEach(function(instruction) {
            instruction = parse.removeWhitespace(instruction);
            if (parse.commandType(instruction) === 'C' || parse.commandType(instruction) === 'A') {
                ROMcounter++;
            } else if (parse.commandType(instruction) === 'M') {
                if (macro.macroType(instruction) === "G") {
                    macroInst = macro.breakdownGinstruction(instruction) + '\n';
                    ROMcounter += (macroInst.match(/\n/g) || []).length;
                } else if (macro.macroType(instruction) === "I") {
                    macroInst = macro.breakdownIinstruction(instruction) + '\n';
                    ROMcounter += (macroInst.match(/\n/g) || []).length;
                } else if (macro.macroType(instruction) === "E") {
                    macroInst = macro.breakdownEinstruction(instruction) + '\n';
                    ROMcounter += (macroInst.match(/\n/g) || []).length;
                }
            } else if (parse.commandType(instruction) === 'L') {
                if (table.contains(parse.getSymbol(instruction))) {
                    console.error("Line " + ROMcounter + ": Label (" + parse.getSymbol(instruction) + ") already exists");
                } else {
                    table.addLabel(parse.getSymbol(instruction), ROMcounter);
                }
            }
        });

        ROMcounter = -1;

        //second pass
        instructions.forEach(function(instruction) {
            instruction = parse.removeWhitespace(instruction);
            if (parse.commandType(instruction) === 'L') {
                return;
            } else if (parse.commandType(instruction) === 'A') {
                ROMcounter++;
                var AValue = parse.getSymbol(instruction);
                //check if literal if not check if in symbol table, if not, add to table
                if (!Number.isInteger(parseInt(AValue, 10))) {
                    if (!table.contains(AValue)) {
                        table.addLabel(AValue, RAMcounter);
                        RAMcounter++;
                    }
                    AValue = table.getAddress(AValue);
                }
                assemblerOutput += code.getAcode(AValue, ROMcounter) + '\n';
            } else if (parse.commandType(instruction) === 'C') {
                ROMcounter++;
                assemblerOutput += code.getCcode(parse.breakdownCintruction(instruction), ROMcounter) + '\n';
            } else if (parse.commandType(instruction) === 'M') {
                if (macro.macroType(instruction) === "G") {
                    macroInst = macro.breakdownGinstruction(instruction) + '\n';
                    ROMcounter += (macroInst.match(/\n/g) || []).length;
                    assemblerOutput += module.exports.assemble(macroInst) + "\n";
                    // assemblerOutput += macroInst;
                    // console.error(JSON.stringify(table));
                } else if (macro.macroType(instruction) === "I") {
                    macroInst = macro.breakdownIinstruction(instruction) + '\n';
                    ROMcounter += (macroInst.match(/\n/g) || []).length;
                    assemblerOutput += module.exports.assemble(macroInst) + "\n";
                    // assemblerOutput += macroInst;
                } else if (macro.macroType(instruction) === "E") {
                    macroInst = macro.breakdownEinstruction(instruction) + '\n';
                    ROMcounter += (macroInst.match(/\n/g) || []).length;
                    assemblerOutput += module.exports.assemble(macroInst) + "\n";
                    // assemblerOutput += macroInst;
                }
            }
        });

        return assemblerOutput.trim();
    }
}
