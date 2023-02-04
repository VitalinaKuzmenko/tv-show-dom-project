//carousel

$(document).ready(function () {
  $(".gallery").on("mouseleave", function () {
    $(this).flickity("playPlayer");
  });
});
