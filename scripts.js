document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('site-form');
    const siteItems = document.getElementById('site-items');
    const exportBtn = document.getElementById('export-btn');

    function loadSites() {
        const sites = JSON.parse(localStorage.getItem('sites')) || [];
        siteItems.innerHTML = '';
        sites.forEach((site, index) => {
            addSiteToList(site.name, site.url, index);
        });
    }

    function saveSite(name, url) {
        const sites = JSON.parse(localStorage.getItem('sites')) || [];
        sites.push({ name, url });
        localStorage.setItem('sites', JSON.stringify(sites));
    }

    function updateSite(index, name, url) {
        const sites = JSON.parse(localStorage.getItem('sites')) || [];
        sites[index] = { name, url };
        localStorage.setItem('sites', JSON.stringify(sites));
    }

    function deleteSite(index) {
        const sites = JSON.parse(localStorage.getItem('sites')) || [];
        sites.splice(index, 1);
        localStorage.setItem('sites', JSON.stringify(sites));
    }

    function getFaviconUrl(url) {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = url + '/favicon.ico';
        document.head.appendChild(link);
        return link.href;
    }

    function addSiteToList(name, url, index) {
        const listItem = document.createElement('li');

        const faviconUrl = getFaviconUrl(url);

        const img = document.createElement('img');
        img.src = faviconUrl;
        img.onerror = () => {
            img.src = 'https://www.example.com/default-icon.png'; // Fallback icon if favicon is not available
        };

        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.textContent = name;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit-btn';
        editBtn.addEventListener('click', () => {
            const newName = prompt('Enter new name:', name);
            const newUrl = prompt('Enter new URL:', url);
            if (newName && newUrl) {
                updateSite(index, newName, newUrl);
                loadSites();
            }
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this site?')) {
                deleteSite(index);
                loadSites();
            }
        });

        listItem.appendChild(img);
        listItem.appendChild(link);
        listItem.appendChild(editBtn);
        listItem.appendChild(deleteBtn);
        siteItems.appendChild(listItem);
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('site-name').value;
        const url = document.getElementById('site-url').value;
        if (name && url) {
            saveSite(name, url);
            addSiteToList(name, url, JSON.parse(localStorage.getItem('sites')).length - 1);
            form.reset();
        }
    });

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

    loadSites();
});
