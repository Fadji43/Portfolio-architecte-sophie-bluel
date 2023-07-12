fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    const allWorks = data;
    ajoutGallery(allWorks);

    
function ajoutGallery(works) {
  const galleryElement = document.querySelector('.gallery');
  galleryElement.innerHTML = "";

  works.forEach(work => {
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    image.src = work.imageUrl;
    const caption = document.createElement('figcaption');
    caption.textContent = work.title;

    figure.appendChild(image);
    figure.appendChild(caption);
    galleryElement.appendChild(figure);
  });
}

function triObjets(works, category) {
  let filteredWorks;

  if (category == "all") {
    filteredWorks = works;
  } else {
    filteredWorks = works.filter(work => {
      return work.category.id.toString() === category;
    });
  }

  ajoutGallery(filteredWorks);
}

const filterButtons = document.querySelectorAll('.filtres');
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        triObjets(allWorks, category);
      });
    });
  })

  function isLoggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }
  
  const modeEditeur = document.getElementById('modeEditor');
  const btns = document.querySelectorAll('.btnModifier');
  const btnCategory = document.querySelector('.category')
  if (isLoggedIn()) {
    btns.forEach(btnModifier => {
      btnModifier.style.display = "block";
    });
    modeEditeur.style.display = "block";
    btnCategory.style.display = "none";
  } else {
    btns.forEach(btnModifier => {
      btnModifier.style.display = "none";
    });
    modeEditeur.style.display = "none";
    btnCategory.style.display = "block";
  }

//addEventlisteners au clique de btnModifier
btns.addEventListener('click', (=> {
  modal1)

 

//création de la modale
const 
//modal1
//modal2
//modal3


// au clique du bouton ajoutre photo changement de modale
//charger la photo et insérer texte et catégorie
// valider les informations et fermture de la modale
