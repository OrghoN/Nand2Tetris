#! /usr/local/bin/node

//load modules
var parse = require('./parser');
var code = require('./code');
var symbolTable = require('./symbolTable');

var assemblerOutput = '';
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
        program = parse.removeComments(program).trim();
        var instructions = program.split('\n');

        //first pass
        instructions.forEach(function(instruction) {
            instruction = parse.removeWhitespace(instruction);
            if (parse.commandType(instruction) === 'C' || parse.commandType(instruction) === 'A') {
                ROMcounter++;
            } else if (parse.commandType(instruction) === 'L') {
                if (table.contains(parse.getSymbol(instruction))) {
                    console.error("Line "+ ROMcounter +": Label (" + parse.getSymbol(instruction) + ") already exists");
                } else {
                    table.addLabel(parse.getSymbol(instruction), ROMcounter);
                }
            }
        });

        ROMcounter = -1;

        //second pass
        instructions.forEach(function(instruction) {
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
            }
        });

        return assemblerOutput.trim();
    }
}
