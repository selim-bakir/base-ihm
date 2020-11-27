context = require.context('../src/assets/scripts/', true, /\.js$/);
context.keys().forEach(context);
module.exports = context;