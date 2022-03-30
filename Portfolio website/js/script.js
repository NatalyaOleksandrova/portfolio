$(".js-mob-open").on("click", function () {
	$(this).toggleClass("active");
	$(".js-mob-nav").stop().fadeToggle(300);
});
$(document).on("click touchstart", function (e) {
	if (
		$(e.target).closest(".js-mob-nav").length ||
		$(e.target).closest(".js-mob-open").length
	)
		return;
	$(".js-mob-open").removeClass("active");
	$(".js-mob-nav").stop().fadeOut(300);
});
var counterContainer = document.querySelector(".website-counter");
var resetButton = document.querySelector("#reset");
var visitCount = localStorage.getItem("page_view");

// Check if page_view entry is present
if (visitCount) {
  visitCount = Number(visitCount) + 1;
  localStorage.setItem("page_view", visitCount);
} else {
  visitCount = 1;
  localStorage.setItem("page_view", 1);
}
counterContainer.innerHTML = visitCount;

resetButton.addEventListener("click", () => {
	visitCount = 1;
	localStorage.setItem("page_view", 1);
	counterContainer.innerHTML = visitCount;
  });
