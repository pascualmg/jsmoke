const path = require('path');

module.exports = {
    entry: path.resolve(__dirname , 'src/main.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'src/demo')
    },
    mode: 'development',
};