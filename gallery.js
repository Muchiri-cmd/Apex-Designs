const container = document.getElementById('container');
const cols = Array.from(container.getElementsByClassName('col'));
const loader = document.getElementById('loader');
let fetching = false;

const fetchImages = () => {
  return new Promise((resolve) => {
    const images = Array.from({ length: 10 }, (_, i) => `assets/images/image${i + 1}.jpeg`);
    setTimeout(() => resolve(images), 1000); 
  });
};

const createCard = (image, col) => {
  const card = document.createElement('div');
  card.classList.add('card');

  const img = document.createElement('img');
  img.src = image;
  img.alt = 'Gallery image';
  img.onerror = () => {
    card.style.display = 'none';
  };

  card.appendChild(img);
  col.appendChild(card);
};

const handleScroll = () => {
  if (fetching) return;

  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollHeight - (scrollTop + clientHeight) < 100) {
    loadMoreImages();
  }
};

const loadMoreImages = () => {
  fetching = true;
  loader.style.display = 'flex';

  fetchImages().then((images) => {
    images.forEach((image, index) => {
      createCard(image, cols[index % cols.length]);
    });
    loader.style.display = 'none';
    fetching = false;
  });
};

window.addEventListener('scroll', handleScroll);
loadMoreImages();
