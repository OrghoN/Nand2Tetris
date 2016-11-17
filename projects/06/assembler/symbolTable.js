#! /usr/local/bin/node

module.exports = {

    symbolTable: function () {
        this.addLabel = function(symbol, address) {
            this[symbol] = address;
        };

        this.contains = function(symbol) {
            return this.hasOwnProperty(symbol);
    };

    // return address of given symbol
    this.getAddress = function(symbol) {
        if (this.contains(symbol)) {
            return this[symbol];
        }
    };

    this['SP'] = 0;
    this['LCL'] = 1;
    this['ARG'] = 2;
    this['THIS'] = 3;
    this['THAT'] = 4;
    this['SCREEN'] = 16384;
    this['KBD'] = 24576;

    for (var i = 0; i <= 15; i++) {
        this['R' + i] = i;
    }
}
}
