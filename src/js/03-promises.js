const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  // console.log(typeof event);
  const position = {
    position: 1,
  };
  const formData = new FormData(event.currentTarget);
  // console.log(formData);
  formData.forEach((value, name) => {
    position[name] = parseInt(value);
  });
  // console.log(formData);

  callPromise(position);
}

function createPromise({position, delay}) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({position: position, delay: delay});
      } else {
        // Reject
        reject({position: position, delay: delay});
      }
    }, delay);
  })
}

function callPromise({ delay, step, amount }) {
  for (let position = 1; position <= amount; position += 1) {
    createPromise({position, delay}).then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    }).catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    delay += step;
  }
}



