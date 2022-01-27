function reciepeComponent(data) {

  return `
<div class="container recipe">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="our-team-main">

                            <div class="team-front">
                                <img src="${data.foodImageURL}" />
                                <h3>${data.meal}</h3>
                                <p>${data.category}</p>
                            </div>

                            <div class="team-back">
                                <div class="back-side-info">
                                    <h4>Ingredients</h4>
                                    <ul>
                                    ${data.ingredients
                                      .split(",")
                                      .map(
                                        (ingredient) =>
                                          "<li>" + ingredient + "</li>"
                                      )
                                      .join("")}
                                    </ul>
                                    <a href="#singleRecipe" data-id="${data.id}" >View the recipe</a>
                                </div>

                                <img class="foodImage"
                                    src="${data.foodImageURL}" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
`;
}
