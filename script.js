const appIcons = document.querySelectorAll('.app-icon');
appIcons.forEach(icon => {
    icon.setAttribute('draggable', true);
    
    icon.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
    });

    icon.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    icon.addEventListener('drop', (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text');
        const draggedIcon = document.getElementById(data);
        e.target.parentNode.insertBefore(draggedIcon, e.target);
    });
});
