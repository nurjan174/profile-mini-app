   window.onload = function() {
     const user = window.Telegram.WebApp.initDataUnsafe.user;
     document.getElementById("photo").src = user.photo_url || "default.jpg";
     document.getElementById("username").innerText = "@" + (user.username || "unknown");
   };
   
   