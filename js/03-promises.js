const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const delay = parseInt(form.elements.delay.value);
    const step = parseInt(form.elements.step.value);
    const amount = parseInt(form.elements.amount.value);

    generatePromises(delay, step, amount);
});

function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const shouldResolve = Math.random() > 0.3;

            if (shouldResolve) {
                resolve({ position, delay });
            } else {
                reject({ position, delay });
            }
        }, delay);
    });
}

function generatePromises(initialDelay, delayStep, promiseCount) {
    let currentDelay = initialDelay;

    for (let i = 0; i < promiseCount; i++) {
        createPromise(i + 1, currentDelay)
            .then(({ position, delay }) => {
                console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
            })
            .catch(({ position, delay }) => {
                console.log(`❌ Rejected promise ${position} in ${delay}ms`);
            });

        currentDelay += delayStep;
    }
}
