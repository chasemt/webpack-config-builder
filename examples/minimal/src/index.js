import './styles.css';

const app = document.getElementById('app');

function createCard(title, description) {
  const card = document.createElement('div');
  card.className = 'card';

  const titleEl = document.createElement('h2');
  titleEl.textContent = title;

  const descEl = document.createElement('p');
  descEl.textContent = description;

  card.appendChild(titleEl);
  card.appendChild(descEl);

  return card;
}

function init() {
  const container = document.createElement('div');
  container.className = 'container';

  const header = document.createElement('header');
  header.className = 'header';
  header.innerHTML = '<h1>Minimal Example</h1><p>Webpack Config Builder - No Framework</p>';

  const main = document.createElement('main');
  main.className = 'main';

  const cards = [
    createCard('Simple', 'No framework dependencies'),
    createCard('Fast', 'Lightweight and performant'),
    createCard('Flexible', 'Easy to customize'),
  ];

  cards.forEach(card => main.appendChild(card));

  container.appendChild(header);
  container.appendChild(main);
  app.appendChild(container);

  // Add click handler
  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      alert(`Card ${index + 1} clicked!`);
    });
  });
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

