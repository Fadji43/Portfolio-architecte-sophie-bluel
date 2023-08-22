const form = document.querySelector('form');
form.addEventListener('submit', login);

function login(event) {
  event.preventDefault();

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
  .then(response => response.json())
  .then(data => {
    const token = data.token;

    // Pour le débogage
    console.log('Données renvoyées par l\'API:', data);
    console.log('Valeurs saisies par l\'utilisateur:', email, password);

    // Vérifier les informations de connexion avec celles de l'API
    if (email === "sophie.bluel@test.tld" && password === "S0phie") {
      // Connexion réussie, enregistrer le token dans le local storage
      localStorage.setItem('token', token);
      window.location.href = "index.html";
    } else {
      // Informations de connexion incorrectes, afficher un message d'erreur
      alert('Identifiants incorrects');
    }
  })
  .catch(error => {
    console.error('Une erreur est survenue:', error);
    // Gérer l'affichage d'un message d'erreur approprié en cas d'échec de la requête
  });
}
