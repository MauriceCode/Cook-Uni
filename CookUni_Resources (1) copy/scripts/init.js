var receipeContainer = null;
var userId = sessionStorage.getItem("token");

// on page load
$(document).ready(async function () {
    // footer component 
  $("#rooter").html(function () {
    return $(this)[0].innerHTML.replace("{{footer}}", footerComponent());
  });
  // nav component 
  $("#rooter").html(function () {
    return $(this)[0].innerHTML.replace("{{nav}}", navComponent());
  });

  $(".nav-link[data-id='logout']").on("click", function () {
    sessionStorage.removeItem("token");
    window.location.href = "/signin.html";
  });
  receipeContainer = document.querySelector("#sharedRecipes");

  if (receipeContainer) {
    var welcome = document.querySelector(".nav-link[data-id='welcome']");
    var shareRecipe = document.querySelector("#share-receipt-form");
    var hiddenLinks = document.querySelectorAll(".nav-link[data-id]");
    if (userId) {
      let response = await fetch(dbUrl + "/Users/" + userId + ".json");
      response = await response.json();
      if (response) {
        welcome.innerHTML =
          "welcome, " + response.firstName + " " + response.lastName;
        [...hiddenLinks].forEach((link) => link.classList.add("show"));
        shareRecipe.classList.add("show");
      }
    }
    await getReceipt();
    refreshRecipes();
  }
  
});

// render recipes
async function refreshRecipes() {
  receipeContainer.innerHTML = receiptList
    .map((receipe) => reciepeComponent(receipe))
    .join("");
  $(".recipe").on("click", async function (event) {
    const id = $(event.target).data("id");
    const recipeData = await getReceiptById(id);
    $(".detailsFoodImage img").attr("src", recipeData.foodImageURL);
    $(".infoPack h3").text(recipeData.meal);
    $(".infoPack .prep-method").text(recipeData.prepMethod);
    $(".infoPack .description").text(recipeData.description);
    $(".detailsIngredients ul").html(
      recipeData.ingredients
        .split(",")
        .map((ingredient) => "<li>" + ingredient + "</li>")
        .join("")
    );
    const $edit = $(".recepieInfo .actions .btn-info");
    const $delete = $(".recepieInfo .actions .btn-danger");
    const $like = $(".recepieInfo .actions .btn-success");
    if (userId) {
      $like[0].classList.remove("disabled");
    }
    if (userId === recipeData.userID) {
      $edit[0].classList.remove("hide");
      $delete[0].classList.remove("hide");
    }
    document.querySelector("#singleRecipe").classList.add("show");
    $like.data("id", id);
    $like.data("likes", recipeData.likesCounter);
    $like.text(recipeData.likesCounter + " Likes");
    $edit.data("id", id);
    $delete.data("id", id);
  });
}
