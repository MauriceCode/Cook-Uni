const receipeContainer = document.querySelector("#sharedRecipes");


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
    document.querySelector("#singleRecipe").classList.add("show");
    $(".recepieInfo .actions .btn-info").data("id", id);
    $(".recepieInfo .actions .btn-danger").data("id", id);
  });
}

// on page load
$(document).ready(async function () {
  await getReceipt();
  refreshRecipes();
});

$(".recepieInfo .actions .btn-info").on("click", async function () {
  const id = $(this).data("id");
  // console.log(id)
  const recipeData = await getReceiptById(id);
  $("#edit-receipt-form [name]").each(function (i, input) {
    $(input).val(recipeData[$(input).attr("name")]);
  });
  document.querySelector("#edit-receipt-form").classList.add("show");
});

$(".recepieInfo .actions .btn-danger").on("click", async function () {
  const id = $(this).data("id");
  // console.log(id)
  const recipeData = await deleteRecipe(id);
  receiptList = receiptList.filter((recipe) => recipe.id !== id);
  document.querySelector("#singleRecipe").classList.remove("show");
  refreshRecipes();
});

$("#share-receipt-form").on("submit", function (event) {
  event.preventDefault();
  var $inputs = $(this).find("[name]");
  var data = {};
  $inputs.each(function (i, el) {
    data[$(el).attr("name")] = $(el).val();
  });
  addReceipt(data);
});

$("#edit-receipt-form").on("submit", function (event) {
  event.preventDefault();
  var $inputs = $(this).find("[name]");
  const id = $(".recepieInfo .actions .btn-info").data("id");
  var editData = {};
  $inputs.each(function (i, el) {
    editData[$(el).attr("name")] = $(el).val();
  });
  updateRecipe(id, editData);
  receiptList = receiptList.map((recipe) => {
    if (recipe.id === id) {
      return { id, ...editData };
    }
    return recipe;
  });
  document.querySelector("#edit-receipt-form").classList.remove("show");
  document.querySelector("#singleRecipe").classList.remove("show");
  refreshRecipes();
});
