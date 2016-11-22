#! /usr/local/bin/node

module.exports = {
    removeWhitespace: function(str) {
        return str.replace(/\s+/g, '');
    },

    removeComments: function(str) {
        str = str.replace(/\/\/.*/g, '');
        str = str.replace(/\n\r/g, '');
        return str.replace(/\r/g, '');
    },

    commandType: function(str) {
        if (str.charAt(0) === '@') {
            return 'A';
        } else if (str.charAt(0) === '(') {
            return 'L';
        } else if (str.charAt(0) === '#') {
            return 'M';
        } else {
            return 'C';
        }
    },

    getSymbol: function(str) {
        if (module.exports.commandType(str) === 'A') {
            return str.slice(1);
        } else if (module.exports.commandType(str) === 'L') {
            return str.slice(1, -1);
        }
    },

    // takes an instruction string, returns object identifying its fields
    breakdownCintruction: function(str) {
        var fields = {};
        var equalsSplit = str.split(/=/);
        if (equalsSplit.length == 1) {
            // no equal sign, so this is a comp;jump code
            var semicolonSplit = equalsSplit[0].split(/;/);
            fields.comp = semicolonSplit[0];
            fields.jump = semicolonSplit[1];
            fields.dest = null;
        } else if (equalsSplit.length == 2) {
            var semicolonSplit = equalsSplit[1].split(/;/);
            if (semicolonSplit.length == 1) {
                // no semicolon, so this is a dest=comp code
                fields.dest = equalsSplit[0];
                fields.comp = semicolonSplit[0];
                fields.jump = null;
            } else if (semicolonSplit.length == 2) {
                // has equals and semicolon, so this is a dest=comp;jump code
                fields.dest = equalsSplit[0];
                fields.comp = semicolonSplit[0];
                fields.jump = semicolonSplit[1];
            }

        }
        return fields;
    }
}
