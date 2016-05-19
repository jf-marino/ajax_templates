(function() {
    
    window.User = {
        url: 'http://127.0.0.1:8080/users'
    };
    
    var templateString = '';
        templateString += '<div class="user">';
        templateString +=     '<h2><%= name %></h2>';
        templateString +=     '<p>email: <%= email %></p>';
        templateString += '</div>';
    
    var template = _.template(templateString);
    
    User.list = function(userList) {
        if(userList && userList.length) {
            var container = $('#user-list');
            container.empty();
            userList
            .map(function(user) {
                return template(user);
            })
            .forEach(function(userMarkup) {
                container.append(userMarkup);
            });
        }
        
        return User;
    };
    
    User.getAll = function() {
        $.get(this.url).then(function(userList) {
            User.list(userList);
        });
        return User;
    };
    
    User.add = function(name, email) {
        $.post({
            url: this.url + '/new',
            contentType: 'application/json',
            data: JSON.stringify({ name: name, email: email })
        }).then(function() {
            User.getAll();
        })
    }
    
})();



$(document).ready(function() {
        
      User.getAll();
      
      $('#add-user-button').on('click', function(e) {
          e.preventDefault();
          var name = $('#add-user-form input[name="name"]').val();
          var email = $('#add-user-form input[name="email"]').val();
          console.log("name and email");
          console.log(name);
          console.log(email);
          User.add(name, email);
      });
        
});