$(function () {
  var login = $("#log-in");
  var shadow = '';
  for (let i = 0; i < 50; i++) {
    shadow += (shadow ? ',' : '') + `${i}px ${i}px 0 rgb(50, 175, 50)`;
  }
  login.css("text-shadow", shadow);
});