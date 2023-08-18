import SlimSelect from 'slim-select';
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
            new SlimSelect({
                select: selectCatBreed,
                settings: {
                    openPosition: 'down'
                }
            });
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
            // console.log(catInfo.url);
            let { name, description, temperament } = catInfo.breeds[0];
            let src = catInfo.url;

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
