

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
  if (confirm("Are you sure wyou want to delete recipe?")) {
    const recipeData = await deleteRecipe(id);
    window.location.reload();
  }
});

$(".recepieInfo .actions .btn-success").on("click", async function () {
  const likeBtn = $(this);
  const id = likeBtn.data("id")
  // console.log(id)
  const editData = {
    likesCounter: likeBtn.data("likes") + 1
  }
  updateRecipe(id, editData);
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
