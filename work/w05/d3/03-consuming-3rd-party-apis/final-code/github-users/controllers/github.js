const fetch = require('node-fetch');
const rootURL = 'https://api.github.com/';
const token = process.env.GITHUB_TOKEN;

module.exports = {
  userDetails
};

async function userDetails(req, res) {
  const username = req.query.username;
  if (!username) return res.render('index', { userData: null });
  // const options = {
  //   url: rootURL + 'users/' + username,
  //   headers: {
  //     'User-Agent': 'jim-clark',
  //     'Authorization': 'token ' + process.env.GITHUB_TOKEN
  //   }
  // };
  // request(options, function(err, response, body) {
  //   const userData = JSON.parse(body);
  //   // update the options url to fetch the user's repos
  //   options.url = userData.repos_url;
  //   request(options, function(err, response, body) {
  //     // add a repos property
  //     try {
  //       userData.repos = JSON.parse(body);
  //       res.render('index', {userData});
  //     } catch {
  //       res.redirect('/');
  //     }
  //   });
  // });

  const options = {
    headers: {
      Authorization: `token ${token}`
    }
  };
  // let userData;
  fetch(`${rootURL}users/${username}`, options)
    .then(res => res.json())
    .then(user => {
      userData = user;
      // return the promise to be handled by the next .then
      return fetch(user.repos_url, options).then(res => res.json());
    })
    .then(repos => {
      // let's see what properties a repo has...
      console.log(repos[0]);
      // add a repos property to userData that we are passing to be rendered
      userData.repos = repos;
      res.render('index', { userData });
    });
  
  // Using async/await
  // const userData = await fetch(`${rootURL}users/${username}`, options).then(res => res.json());
  // userData.repos = await fetch(userData.repos_url, options).then(res => res.json());
  // res.render('index', { userData });
}
