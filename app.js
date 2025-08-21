document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('prono-form');
    const pronosList = document.getElementById('pronos-list');
    const actualitesContainer = document.getElementById('actualites-container');

    // Load pronos from localStorage
    function loadPronos() {
        const pronos = JSON.parse(localStorage.getItem('pronos') || '[]');
        pronosList.innerHTML = '';
        pronos.forEach(function(prono) {
            const li = document.createElement('li');
            li.textContent = prono.match + ' : ' + prono.prono;
            pronosList.appendChild(li);
        });
    }

    // Add prono
    form?.addEventListener('submit', function(e) {
        e.preventDefault();
        const match = document.getElementById('match').value;
        const prono = document.getElementById('prono').value;
        if (match && prono) {
            const pronos = JSON.parse(localStorage.getItem('pronos') || '[]');
            pronos.push({ match, prono });
            localStorage.setItem('pronos', JSON.stringify(pronos));
            loadPronos();
            form.reset();
        }
    });

    loadPronos();

    // Load articles
    if (actualitesContainer) {
        fetch('/api/articles')
            .then(res => res.json())
            .then(articles => {
                actualitesContainer.innerHTML = '';
                articles.forEach(article => {
                    const div = document.createElement('div');
                    div.className = 'actualite';
                    div.innerHTML = `
                        <img src="${article.image}" alt="${article.title}">
                        <h3>${article.title}</h3>
                        <p>${article.content}</p>
                    `;
                    actualitesContainer.appendChild(div);
                });
            });
    }
});
