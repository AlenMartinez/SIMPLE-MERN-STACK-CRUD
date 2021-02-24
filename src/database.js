const mongoose = require('mongoose');

const URI = 'mongodb://localhost/mer-tasks';

mongoose.connect(URI).then(db => console.log('se conecto'))
                    .catch(err => console.error(err, 'doio error'));

module.exports = mongoose;