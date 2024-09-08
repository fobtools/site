document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('site-form');
    const siteItems = document.getElementById('site-items');
    const exportBtn = document.getElementById('export-btn');

    // Load existing sites from localStorage
    function loadSites() {
        const sites = JSON.parse(localStorage.getItem('sites')) || [];
        siteItems.innerHTML = '';
        sites.forEach(site => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="${site.url}" target="_blank">${site.name}</a>`;
            siteItems.appendChild(listItem);
        });
    }

    // Save sites to localStorage
    function saveSite(name, url) {
        const sites = JSON.parse(localStorage.getItem('sites')) || [];
        sites.push({ name, url });
        localStorage.setItem('sites', JSON.stringify(sites));
    }

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('site-name').value;
        const url = document.getElementById('site-url').value;
        if (name && url) {
            saveSite(name, url);
            loadSites();
            form.reset();
        }
    });

    // Export data to CSV
    exportBtn.addEventListener('click', () => {
        const sites = JSON.parse(localStorage.getItem('sites')) || [];
        let csvContent = "data:text/csv;charset=utf-8,Name,URL\n";
        sites.forEach(site => {
            csvContent += `${site.name},${site.url}\n`;
        });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'sites.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Initial load of sites
    loadSites();
});
