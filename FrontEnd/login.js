// Récupérer les données du formulaire
const emailDOM = document.querySelector('#email');
const email = emailDOM.value;
const passwordDOM = document.querySelector('#password');
const password = passwordDOM.value;

// Envoyer une requête au backend avec les éléments du formulaire
fetch('http://localhost:5678/api/users/login', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'}, 
  body: JSON.stringify({ email: email, password: password })
})
// Récupérer le token dans la réponse
.then(response => response.json())
.then(data => {
  const token = data.token;
  // Enregistrer le token dans le local storage
  localStorage.setItem('token', data.token);
});

function isLoggedIn() {
  const token = localStorage.getItem('token', data.token);
  if (token) { 
    return true;
  }
  return false;
}
