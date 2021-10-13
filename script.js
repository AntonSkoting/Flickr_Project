/// Koppla till HTML ///

const searchForm = document.querySelector('#search-form');
const search = document.querySelector('#search');
const searchButton = document.querySelector('#search-button');
const searchResult = document.querySelector('#search-result');



/// Funktions ///

const apiKey = '3a98d4339c88690c2bfacce39b72cde4';

function getDataApi(searchTerm) {
    return `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${searchTerm}&format=json&nojsoncallback=1`;
}

async function getData(api) {
    const response = await fetch(api);
    const data = await response.json();
    return data;
}

async function getPhotoData(searchTerm) {
    const response = await getData(getDataApi(searchTerm));
    const data = response.photos.photo;
    return data;
}

function getPhotoSrc(data) {
    return `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`;
}



/// Events ///

searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const searchTerm = search.value;

    searchResult.innerHTML = `<h1 id="sign">Loading images...<br>Plese Wait.</h1>`;
    getPhotoData(searchTerm).then(photos => {

        searchResult.innerHTML = null;
        photos.forEach(value => {
            //console.table(value);

            const child = document.createElement('article');
            const image = document.createElement('img');
            const title = document.createElement('h3');

            image.src = getPhotoSrc(value);
            child.appendChild(image);

            title.innerHTML = value.title;
            title.classList.add('img-title');
            child.appendChild(title);

            child.classList.add('style-image');
            searchResult.appendChild(child);
        });
    });
    //alert('Loading images...');
});