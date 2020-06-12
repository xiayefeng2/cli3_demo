// console.log(navigator)
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/ws.js').then(res => {
      // console.log(res)
    }).catch(err => {
      console.log(err)
    });
  });
}