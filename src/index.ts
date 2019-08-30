import './main.css';
import './spinner.css';

const body = document.getElementById('load-text');

if (body) {
    body.innerHTML = 'Loading Game...';
    const myInterval = setInterval(() => {
        body.innerHTML = body.innerHTML + '.';
    }, 3000);

    setTimeout(() => {
        clearInterval(myInterval);
        const loaderElem = document.getElementById('load-spinner');
        if (loaderElem && loaderElem.parentNode) {
            loaderElem.parentNode.removeChild(loaderElem);
        }
    }, 180000);
}