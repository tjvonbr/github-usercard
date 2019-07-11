// Select the DOM node to attach the dynamic content

const cardsNode = document.querySelector(".cards");

/* Step 1: using axios, send a GET request to the following URL 
(replacing the palceholder with your Github name):
https://api.github.com/users/<your name>
*/

// const promise = axios.get(`https://api.github.com/users/tjvonbr`);
// console.log(promise);

axios.get('https://api.github.com/users/tjvonbr')
  .then(response => {
    const passedData = response.data;
    const userCard = createUsercard(passedData);
    cardsNode.appendChild(userCard);
    })
  .catch(error => {
    console.log('The gitHub API is currently down, please try again later.', error);
  })

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const instructorsArray = [
'tetondan',
'dustinmyers',
'justsml',
'luishrd',
'bigknell'
];

instructorsArray.forEach(person => {
  axios.get(`https://api.github.com/users/${person}`)
  .then(response => {
    const newPassedData = response.data;
    const newUserCard = createUsercard(newPassedData);
    cardsNode.appendChild(newUserCard);
  })
  .catch(error => {
    console.log('The gitHub API is currently down, please try again later.', error)
  })
})


// Try to pull followers data onto page
const followersArray = [
  'willhorn',
  'johnschneider1'
]

followersArray.forEach(person => {
  axios.get(`https://github.com/users/${person}`)
  .then(response => {
    const followerPassedData = response.data;
    const followerUserCard = createUsercard(followerPassedData);
    cardsNode.appendChild(followerUserCard);
  })
  .catch(error => {
    console.log('Just fuck off.', error);
  })
})  

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <h2> Instructors </h2>
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function createUsercard(receivedData) {
  //Create elements
  const card = document.createElement("div");
  const cardImg = document.createElement("img");
  const cardInfo = document.createElement("div");

  const cardName = document.createElement("h3");
  const cardUsername = document.createElement("p");
  const cardLocation = document.createElement("p");
  const cardProfile = document.createElement("p");
  const cardLink = document.createElement("a");

  const cardFollowers = document.createElement("p");
  const cardFollowing = document.createElement("p");
  const cardBio = document.createElement("p");

  // Add class names where necessary
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  cardName.classList.add('name');
  cardUsername.classList.add('username');
  
   //Add content where necessary
  cardImg.src = receivedData.avatar_url;
  cardName.textContent = receivedData.name;
  cardUsername.textContent = receivedData.login;
  cardLocation.textContent = `Location:  ${receivedData.location}`;
  cardLink.textContent = `Profile:  ${receivedData.url}`;
  cardFollowers.textContent = `Followers:  ${receivedData.followers}`;
  cardFollowing.textContent = `Following:  ${receivedData.following}`;
  cardBio.textContent = `Bio:  ${receivedData.bio}`;

  //Add class names where necessary
  card.appendChild(cardImg);
  card.appendChild(cardInfo);
  cardInfo.appendChild(cardName);
  cardInfo.appendChild(cardUsername);
  cardInfo.appendChild(cardLocation);
  cardInfo.appendChild(cardProfile);
  cardInfo.appendChild(cardFollowers);
  cardInfo.appendChild(cardFollowing);
  cardInfo.appendChild(cardBio);
  cardProfile.appendChild(cardLink);

  return card;
}