var savedUsers = [
    {
        name: 'Pepe',
        email: 'pepe@globallogic.com'
    },
    {
        name: 'Maria',
        email: 'maria@globallogic.com'
    }
];

module.exports = {
    
    getAll: function() {
        return savedUsers;
    },
    
    add: function(name, email) {
        var exists = savedUsers.filter(function(user) {
            return user.email === email;
        }).length;
        if(!exists) {
            savedUsers.push({
                name: name,
                email: email
            });
        }
    }
    
}