// import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const selectCatBreed = document.querySelector('.breed-select');
const loaderWarningText = document.querySelector('.loader');
const errorWarningText = document.querySelector('.error');
const containerCatInfo = document.querySelector('.cat-info');

selectCatBreed.addEventListener('change', getInformationAbouCat);

handlerGetCatInfromation();

function handlerGetCatInfromation() {

    selectCatBreed.style.display = 'none';
    errorWarningText.style.display = 'none';

    fetchBreeds()
        .then(breeds => {
                selectCatBreed.innerHTML = markupOptions(breeds);
                selectCatBreed.style.display = 'block';
        })
        .catch(() => {
            Notify.failure(errorWarningText.textContent);
        })
        .finally(() => {
        loaderWarningText.style.display = 'none';
    })
    
}


function getInformationAbouCat(event) {
    containerCatInfo.innerHTML = '';
    containerCatInfo.style.display = 'none';
    loaderWarningText.style.display = 'block';

    fetchCatByBreed(event.target.value)
        .then(catInfo => {
            console.log(catInfo.url);
            let { name, description, temperament } = catInfo.breeds[0];
            let { src } = catInfo.url;

            containerCatInfo.innerHTML = markupCatInformation({ name, description, temperament, src });

            containerCatInfo.style.display = 'block';
        })
        .catch(() => {
            Notify.failure(errorWarningText.textContent);
        })
        .finally(() => {
            loaderWarningText.style.display = 'none';
        });
}

function markupOptions(breeds) {
    return breeds
        .map(({ id, name }) => `<option value=${id}>${name}</option>`)
        .join('');
}

function markupCatInformation({ name, description, temperament, src }) {
    return `
    <img src="${src}" alt="${name}"/>
    <h2>${name}<h2/>
    <h3>${description}<h3/>
    <p>${temperament}<p/>
    `;
}


// function handlerGetCatInfromation() {
//     selectCatBreed.style.display = 'none';
//     errorWarningText.style.display = 'none';
//     fetchBreeds()
//         .then(breeds => {
//             breeds.forEach(breed => {
//                 const option = document.createElement('option');
//                 option.value = breed.id;
//                 option.textContent = breed.name;
//                 selectCatBreed.appendChild(option);
//             });
//             selectCatBreed.style.display = 'block';
//             loaderWarningText.style.display = 'none';
//         })
//         .catch(() => {
//         loaderWarningText.style.display = 'none';
//         // errorWarningText.style.display = 'block';
//             Notify.failure(errorWarningText.textContent);
//     })
    
// }


// function getInformationAbouCat(event) {

//     const idSelectedCat = event.target.value;
//     containerCatInfo.style.display = 'none';
//     loaderWarningText.style.display = 'block';
    // console.log(idSelectedCat);

//     fetchCatByBreed(idSelectedCat)
//         .then(catInfo => {
//             const imgCat = document.createElement('img');
//             imgCat.src = catInfo.url;
//             containerCatInfo.appendChild(imgCat);

//             const nameCat = document.createElement('h2');
//             nameCat.textContent = catInfo.breeds[0].name;
//             containerCatInfo.appendChild(nameCat);
            
//             const descriptionCat = document.createElement('h3');
//             descriptionCat.textContent = catInfo.breeds[0].description;
//             containerCatInfo.appendChild(descriptionCat);

//             const temperamentCat = document.createElement('p');
//             temperamentCat.textContent = catInfo.breeds[0].temperament;
//             containerCatInfo.appendChild(temperamentCat);

//             containerCatInfo.style.display = 'block';
//             loaderWarningText.style.display = 'none';
//         })
//         .catch(() => {
//             loaderWarningText.style.display = 'none';
//             // errorWarningText.style.display = 'block';
//             Notify.failure(errorWarningText.textContent);
//         });
// }
