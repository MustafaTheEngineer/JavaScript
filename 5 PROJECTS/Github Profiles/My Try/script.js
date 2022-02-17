userInput = document.getElementById("user-input");

const id_selector = {
    name: "nickname",
    bio: "bio",
    follow: "follow",
    profile_pic: "pp",
    repos: "repos"
}

async function getUser(userName) {
    repoNames = document.getElementById(id_selector.repos);
    while(repoNames.firstElementChild)
        repoNames.firstElementChild.remove();

    await fetch("https://api.github.com/users/" + userName).then(data => {
        return data.json();
    }).then(data => {
        document.getElementById(id_selector.profile_pic).src = data.avatar_url;
        document.getElementById(id_selector.name).textContent = data.login;
        document.getElementById(id_selector.bio).textContent = data.bio;
        document.getElementById(id_selector.follow).children[0].textContent = (data.followers > 1) ? data.followers + " Followers" : data.followers + " Follower";
        document.getElementById(id_selector.follow).children[1].textContent = (data.following > 1) ? data.following + " Followings" : data.following + " Following";
        document.getElementById(id_selector.follow).children[2].textContent = data.public_repos + " Repos";

        console.log(data);
    }).catch(error => {
        console.log(error);
    });

    await fetch("https://api.github.com/users/" + userName + "/repos").then(data => {
        return data.json();
    }).then(data => {
        console.log(data);
        data.forEach(item => {
            newLink = document.createElement("a");
            newLink.className = "repo";
            newLink.href = "https://github.com/" + userName + "/" + item.name;
            newLink.target = "_blank";
            newLink.textContent = item.name;
            repoNames.append(newLink);
        });
    });
}

userInput.addEventListener("keyup", e => {
    if (e.key == "Enter")
        getUser(userInput.value);
});

getUser("MustafaTheEngineer");