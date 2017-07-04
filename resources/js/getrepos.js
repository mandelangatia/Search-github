var apiKey = require("./../../.env").apiKey; //fetches the apiKey from .env
repos = function() {};
repos.prototype.userRepos = function(name) {
    $.get("https://api.github.com/users/" + name + "?access_token=" + apiKey).then(function(response) {
        console.log(response);
        $('#profile').html(`
          <h1>Name:${response.name}<h1>
          <img src='${response.avatar_url}'>
          <p>email:${response.email}<p>
          <p>location:${response.location}<p>
          <p>public repos:${response.public_repos}<p>
          <p>following:${response.following}<p>
          <p>followers: ${response.followers}<p>
          `);
        //dataDisplay(response.name, response.login, response.html_url, response.repo_url);
         //console.log(response.login + " " + response.html_url);
    }).fail(function(error) {
        $("#result").text("The username " + name + " is " + error.responseJSON.message + ".");
    });
};
exports.reposModule = repos;
//allows this whole code above to be exported to the interface using the method .reposModule
