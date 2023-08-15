import { fetchBreeds,fetchCatByBreed } from "./cat-api";
const selectCatBreed = document.querySelector('.breed-select');
const loaderWarningText = document.querySelector('.loader');
const errorWarningText = document.querySelector('.error');
const containerCatInfo = document.querySelector('.cat-info');

selectCatBreed.addEventListener('click', handlerGetCatInfromation);
selectCatBreed.addEventListener('change', getInformationAbouCat);

function handlerGetCatInfromation() {
    fetchBreeds()
        .then(breeds => {
            breeds.forEach(breed => {
                const option = document.createElement('option');
                option.value = breed.id;
                option.textContent = breed.name;
                selectCatBreed.appendChild(option);
            });
        })
}

function getInformationAbouCat(event) {
    const idSelectedCat = event.target.value;
    // console.log(idSelectedCat);
    fetchCatByBreed(idSelectedCat)
        .then(catInfo => {
            const imgCat = document.createElement('img');
            imgCat.src = catInfo.url;
            containerCatInfo.appendChild(imgCat);
            const nameCat = document.createElement('h2');
            nameCat.textContent = catInfo.breeds[0].name;
            containerCatInfo.appendChild(nameCat);
            const descriptionCat = document.createElement('h3');
            descriptionCat.textContent = catInfo.breeds[0].description;
            containerCatInfo.appendChild(descriptionCat);
            const temperamentCat = document.createElement('p');
            temperamentCat.textContent = catInfo.breeds[0].temperament;
            containerCatInfo.appendChild(temperamentCat);
        });
}


