document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('site-form');
    const siteItems = document.getElementById('site-items');
    const exportBtn = document.getElementById('export-btn');

    // Load existing sites from localStorage
    function loadSites() {
        const sites = JSON.parse(localStorage.getItem('sites')) || [];
        siteItems.innerHTML = '';
        sites.forEach(site => {
            addSiteToList(site.name, site.url);
        });
    }

    // Save sites to localStorage
    function saveSite(name, url) {
        const sites = JSON.parse(localStorage.getItem('sites')) || [];
        sites.push({ name, url });
        localStorage.setItem('sites', JSON.stringify(sites));
    }

    // Fetch favicon from the website
    function getFaviconUrl(url) {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = url + '/favicon.ico';
        document.head.appendChild(link);
        return link.href;
    }

    // Add site to the list
    function addSiteToList(name, url) {
        const listItem = document.createElement('li');

        // Fetch favicon URL
        const faviconUrl = getFaviconUrl(url);

        // Create image element for favicon
        const img = document.createElement('img');
        img.src = faviconUrl;
        img.onerror = () => {
            img.src = 'https://www.example.com/default-icon.png'; // Fallback icon if favicon is not available
        };

        // Create anchor element for the website name
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.textContent = name;

        listItem.appendChild(img);
        listItem.appendChild(link);
        siteItems.appendChild(listItem);
    }

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('site-name').value;
        const url = document.getElementById('site-url').value;
        if (name && url) {
            saveSite(name, url);
            addSiteToList(name, url);
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
