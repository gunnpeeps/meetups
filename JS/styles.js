$(() => {

  var shadow = '';
  for (let i = 1; i <= 5; i++) {
    shadow += `${shadow ? ',' : ''} ${i}px ${i}px 0 black`;
  }
  $("#js-styles").append(`
    .long-shadow {
      box-shadow:${shadow};
    }
  `);

  var shadow = '';
  for (let i = 1; i <= 1000; i++) {
    shadow += `${shadow ? ',' : ''} ${i}px ${i}px 0 deepskyblue`;
  }
  $("#js-styles").append(`
    #title-slide {
      text-shadow:${shadow};
    }
  `);

});