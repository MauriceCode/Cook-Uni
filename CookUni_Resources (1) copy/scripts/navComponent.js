function navComponent(data) {
  return `
  <header class="masthead mb-auto">
  <div class="inner">
  <h3 class="masthead-brand">CookUni</h3>
  <nav class="nav nav-masthead justify-content-center">
    <a class="nav-link" href="/">Home</a>
    <a class="nav-link" href="#" data-id="welcome"
      >Welcome, {{names}}!</a
    >
    <a class="nav-link" href="#share-receipt-form" data-id="share-recipe">Share recipe</a>
    <a class="nav-link" href="#" data-id="logout">Logout</a>
    <a class="nav-link" href="/signin.html">Login</a>
    <a class="nav-link" href="/signup.html">Register</a>
  </nav>
</div>
      </header>
  
`;
}
