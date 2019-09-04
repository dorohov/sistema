document.addEventListener("DOMContentLoaded", function(){
    setTimeout(function() {
        document.getElementById('preloader').classList.add('is--finished');
        document.body.className = document.body.className.replace("is--preloader","");
    }, 1000)
});