const form = document.getElementById('urlForm');
const urlList = document.getElementById('urlList');
const exportBtn = document.getElementById('exportBtn');
const importInput = document.getElementById('importInput');

let urls = JSON.parse(localStorage.getItem('urls')) || [];

// 加载已有网址
function loadUrls() {
    urlList.innerHTML = '';
    urls.forEach((url, index) => createUrlElement(url, index));
}

// 创建网址元素
function createUrlElement(urlObj, index) {
    const urlItem = document.createElement('div');
    urlItem.classList.add('url-item');

    const faviconUrl = `https://www.google.com/s2/favicons?domain=${urlObj.url}`;
    
    urlItem.innerHTML = `
        <div>
            <img src="${faviconUrl}" alt="Favicon">
            <a href="${urlObj.url}" target="_blank">${urlObj.name}</a>
        </div>
        <div class="controls">
            <button onclick="deleteUrl(${index})">删除</button>
            <button onclick="editUrl(${index})">编辑</button>
        </div>
    `;

    urlList.appendChild(urlItem);
}

// 添加网址
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const siteName = document.getElementById('siteName').value;
    const siteUrl = document.getElementById('siteUrl').value;

    if (siteName && siteUrl) {
        const urlObj = { name: siteName, url: siteUrl };
        urls.push(urlObj);
        localStorage.setItem('urls', JSON.stringify(urls));
        createUrlElement(urlObj, urls.length - 1);
        form.reset();
    }
});

// 删除网址
function deleteUrl(index) {
    urls.splice(index, 1);
    localStorage.setItem('urls', JSON.stringify(urls));
    loadUrls();
}

// 编辑网址
function editUrl(index) {
    const newName = prompt("请输入新的网站名称", urls[index].name);
    const newUrl = prompt("请输入新的网址", urls[index].url);

    if (newName && newUrl) {
        urls[index] = { name: newName, url: newUrl };
        localStorage.setItem('urls', JSON.stringify(urls));
        loadUrls();
    }
}

// 导出网址
exportBtn.addEventListener('click', () => {
    const dataStr = JSON.stringify(urls, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'urls.json';
    a.click();
    URL.revokeObjectURL(url);
});

// 导入网址
importInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                urls = JSON.parse(e.target.result);
                localStorage.setItem('urls', JSON.stringify(urls));
                loadUrls();
            } catch (error) {
                alert('文件格式错误');
            }
        };
        reader.readAsText(file);
    }
});

// 页面加载时自动载入网址
document.addEventListener('DOMContentLoaded', loadUrls);
