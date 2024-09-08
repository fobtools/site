const websites = [
    { name: 'Google', url: 'https://www.google.com' },
    { name: 'Facebook', url: 'https://www.facebook.com' },
    { name: 'YouTube', url: 'https://www.youtube.com' }
    // 添加更多网站
];

function getFaviconUrl(url) {
    return `${url}/favicon.ico`;
}

function createAppIcon(name, url) {
    const container = document.getElementById('app-container');
    const appIcon = document.createElement('div');
    appIcon.classList.add('app-icon');
    
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    
    const img = document.createElement('img');
    img.src = getFaviconUrl(url);
    img.alt = name;
    
    const p = document.createElement('p');
    p.textContent = name;
    
    link.appendChild(img);
    link.appendChild(p);
    appIcon.appendChild(link);
    container.appendChild(appIcon);
}

websites.forEach(website => createAppIcon(website.name, website.url));
