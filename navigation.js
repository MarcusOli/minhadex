
const bodyEl = document.querySelector('body');

function showList() {
    bodyEl.classList.remove('showing-detail');
}

function showDetail() {
    bodyEl.classList.add('showing-detail');
}
