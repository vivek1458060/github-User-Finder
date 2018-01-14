document.getElementById('userInput').addEventListener("keyup", function() {

    var username = document.getElementById('userInput').value;

    if (document.getElementById('userInput').value == "") {
        document.getElementById('userProfile').style.display = "none"
    } else {
        document.getElementById('userProfile').style.display = "block"
    }

    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var profileObject = JSON.parse(this.responseText);
            document.getElementById('github_profile_link').href = profileObject.html_url;
            document.getElementById('user_image').src = profileObject.avatar_url;

            var public_repos = profileObject.public_repos ? profileObject.public_repos : 'null';
            document.getElementById('public_repos').innerHTML = public_repos;

            var public_gists = profileObject.public_gists ? profileObject.public_gists : 'null';
            document.getElementById('public_gists').innerHTML = profileObject.public_gists;

            var followers = profileObject.followers ? profileObject.followers : 0;
            document.getElementById('followers').innerHTML = followers;

            var following = profileObject.following ? profileObject.following : 0;
            document.getElementById('following').innerHTML = following;

            var company = profileObject.company ? profileObject.company : 'null';
            document.getElementById('company').innerHTML = company;

            var blog = profileObject.blog ? profileObject.blog : '#';
            document.getElementById('blog').href = blog;

            var blog = profileObject.blog ? profileObject.blog : 'null';
            document.getElementById('blog').innerHTML = blog;

            var location = profileObject.location ? profileObject.location : 'null';
            document.getElementById('location').innerHTML = location;

            var created_at = profileObject.created_at ? profileObject.created_at : 'null';
            document.getElementById('member_since').innerHTML = created_at;

            function getRepos() {
                var req = new XMLHttpRequest();

                req.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        var reposArray = JSON.parse(this.responseText);

                        document.getElementById('reposDiv').innerHTML = '';

                        var repo = 0;
                        for (; repo <= 2; repo++) {
                            document.getElementById('reposDiv').innerHTML += `<a href=${reposArray[repo].html_url} class="list-group-item">
                                <span class="badge badgeForks">forks: ${reposArray[repo].forks}</span>
                                <span class="badge badgeWatchers">watchers: ${reposArray[repo].watchers}</span>
                                <span class="badge badgeStars">Stars: 0</span>
                                <h4 class="list-group-item-heading">${reposArray[repo].name}</h4>
                                <p class="list-group-item-text">Language: ${reposArray[repo].language}</p>
                                </a>`;
                        }
                    }
                };
                req.open("GET", `https://api.github.com/users/${username}/repos`, true);
                req.send();
            }
            getRepos();
        }
    };
    req.open("GET", `https://api.github.com/users/${username}`, true);
    req.send();
});
