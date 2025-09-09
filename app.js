$(function () {
  let currentUserId = 1;

  // Función principal para renderizar todo
  function renderUser(id) {
    // User Info
    $.ajax({
      url: `https://dummyjson.com/users/${id}`,
      method: "GET",
      success: function (user) {
        $(".info__image img").attr("src", user.image);
        $(".info__content").html(`
          <p><strong>Name:</strong> ${user.firstName} ${user.lastName}</p>
          <p><strong>Age:</strong> ${user.age}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Phone:</strong> ${user.phone}</p>
        `);
      },
    });

    // User Posts
    $.ajax({
      url: `https://dummyjson.com/users/${id}/posts`,
      method: "GET",
      success: function (data) {
        $(".posts h3").text("Posts");
        const posts = data.posts;
        const ul = $(".posts ul").empty();
        posts.forEach((post) => {
          ul.append(`
            <li>
              <h4 data-id="${post.id}">${post.title}</h4>
            </li>
          `);
        });
      },
    });

    // User Todos
    $.ajax({
      url: `https://dummyjson.com/users/${id}/todos`,
      method: "GET",
      success: function (data) {
        $(".todos h3").text("Todos");
        const todos = data.todos;
        const ul = $(".todos ul").empty();
        todos.forEach((todo) => {
          ul.append(`
            <li>
              <p>${todo.todo}</p>
            </li>
          `);
        });
      },
    });
  }

  // Inicializa con el primer usuario
  renderUser(currentUserId);

  // Botones de navegación
  $("header button").eq(0).on("click", function () {
    currentUserId = currentUserId === 1 ? 30 : currentUserId - 1;
    renderUser(currentUserId);
  });

  $("header button").eq(1).on("click", function () {
    currentUserId = currentUserId === 30 ? 1 : currentUserId + 1;
    renderUser(currentUserId);
  });

  // Toggle Posts y Todos
  $(".posts h3").on("click", function () {
    $(".posts ul").slideToggle();
  });

  $(".todos h3").on("click", function () {
    $(".todos ul").slideToggle();
  });

  // Modal al hacer clic en título de post
  $(".posts ul").on("click", "h4", function () {
    const postId = $(this).data("id");

    $.ajax({
      url: `https://dummyjson.com/posts/${postId}`,
      method: "GET",
      success: function (post) {
        const modal = $(`
          <div class="overlay">
            <div class="modal">
              <h2>${post.title}</h2>
              <p>${post.body}</p>
              <p><strong>Views:</strong> ${post.views}</p>
              <button>Close Modal</button>
            </div>
          </div>
        `);

        $("body").append(modal);

        modal.find("button").on("click", function () {
          modal.remove();
        });
      },
    });
  });
});
