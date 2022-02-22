const crypto = require('crypto')

const users = [{
    id: crypto.randomUUID(),
    name: 'Bruno',
    city: 'Cuiabá'
}]

module.exports = users;
