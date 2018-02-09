$(function () {
    $('#username').on('keyup', function (e) {

        if (e.keyCode === 13) {
            var username = $('#username').val();
            var userURL = 'https://api.github.com/users/' + username;
            axios.get(userURL).then(function (response) {
                var profileTemplate = $('#profile-template').html();
                var html = Mustache.render(profileTemplate, response.data);
                $('#profileDiv').html(html);
                $('.panel').removeClass('hidden');

                var repoURL = 'https://api.github.com/users/' + username + '/repos';
                axios.get(repoURL).then(function (response) {
                    var reposTemplate = $('#repos-template').html();
                    var html = Mustache.render(reposTemplate, response);
                    $('#resposDiv').html(html);
                });
                $('.alert').addClass('hidden');
            }).catch(function (error) {
                if (error.response) {
                    if (error.response.status == 404) {
                        $('.alert').html('<strong>Alert!</strong> Username is not valid.').removeClass('hidden');
                    } else if (error.response.status == 403) {
                        $('.alert').html('<strong>Alert!</strong> rate limit exceeded, please try after sometime').removeClass('hidden');
                    }
                } else if (error.request) {
                    $('.alert').html('<strong>Alert!</strong> Check your internet Connection.').removeClass('hidden');
                }
            });
        }
    })
});
