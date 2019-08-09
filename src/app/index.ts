
const worker = new Worker('/dist/worker.bundle.js');

console.log('Hello');

worker.postMessage('nope');
setInterval(() => {
    const isEven = Math.floor(Math.random() * Math.floor(2)) === 0;
    const msg = isEven ? 'INCREMENT': 'DECREMENT';
    worker.postMessage(msg);
}, 5000);
