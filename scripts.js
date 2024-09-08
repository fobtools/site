function openTab(tabId) {
    // 隐藏所有标签内容
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.style.display = 'none';
    });

    // 移除所有标签按钮的活动状态
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // 显示当前选中的标签内容
    document.getElementById(tabId).style.display = 'block';

    // 设置当前标签按钮为活动状态
    const activeButton = [...buttons].find(button => button.textContent === tabId.replace('tab', '标签 '));
    if (activeButton) {
        activeButton.classList.add('active');
    }
}
