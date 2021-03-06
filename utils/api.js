const api = {
  getUser(username) {

    function(({ username }) {
      const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
  
      axios.get(queryUrl).then(function(res) {
        const repoNames = res.data.map(function(repo) {
          return repo.name;
        });
  
        const repoNamesStr = repoNames.join("\n");
  
        fs.writeFile("repos.txt", repoNamesStr, function(err) {
          if (err) {
            throw err;
          }
  
          console.log(`Saved ${repoNames.length} repos`);
        });
      });
    };

  }
};

module.exports = api;
