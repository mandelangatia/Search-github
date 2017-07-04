var repos = require("./../resources/js/getrepos.js").reposModule; //basically fetches the object constructor repos from getrepos.js
// var display = function(name, userInfo, reposInfo, moreInfo) {
//     $("#name").text(name);
//     $("#login").text(userInfo);
//     $("#repoos").append("<h3><a href=" + reposInfo + ">Click to see " + name + "'s" + " repositories.</a>" + "<h3>");
//     console.log(userInfo, " ", reposInfo + " YES");
// };
$(document).ready(function() {
    var searchrepos = new repos();
    //searchrepos.userRepos();
    $("#githubuser").click(function(event) {
        //event.preventDefault();
        var name = $("input#user").val(); //this get the user input
        $("input#user").val("");
        console.log(name);
        searchrepos.userRepos(name);
        //
        //
        //
        // searchrepos.userRepos(name, display);
        // display();
        // $('#name').empty();
        // $('#login').empty();
        // $('#repoos').empty();

    });
});
