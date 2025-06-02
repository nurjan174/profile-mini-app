   window.onload = function() {
     const user = window.Telegram.WebApp.initDataUnsafe.user;
     document.getElementById("photo").src = user.photo_url || "default.jpg";
     document.getElementById("MODKAbot").innerText = "@" + user.username;
   };
   