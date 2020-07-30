document.addEventListener('DOMContentLoaded', function () {
    // Activate sidebar nav
    const elems = document.querySelectorAll('.sidenav')
    M.Sidenav.init(elems)
    loadNav()

        function loadNav() {
        var xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status != 200) return

                // Muat daftar tautan menu
                document.querySelectorAll('.topnav, .sidenav').forEach(function (elm) {
                    elm.innerHTML = xhttp.responseText
                })

                document.querySelectorAll('.topnav, .sidenav').forEach(function (elm) {
                    elm.addEventListener("click", function (event) {
                        // Tutup sidenav
                        const sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                       
                        // Muat konten halaman yang dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                })
            }
        }
        xhttp.open('GET', 'nav.html', true)
        xhttp.send()
    }

//load page content
var page = window.location.hash.substr(1)
if (page === "") page = "home"
loadPage(page)

function loadPage(page) {
    var xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            var content = document.querySelector('#body-content')

            if (this.status === 200) {
                content.innerHTML = xhttp.responseText;
                var slider = document.querySelectorAll(".slider");
                M.Slider.init(slider,{
                    indicators: false,
                    height:500,
                    interval:3000,
                    fullWidth: true,
                });
                const parallax = document.querySelector(".parallax");
                M.Parallax.init(parallax);

                if (page == "standings") {
                    getDataStandings();
                } 
                    if (page == "match") {
                        getDataMatch();
                    }
                if (page == "club") {      
                    getDataClub();
                }
                if (page == "favourite"){
                    getSavedArticles();
                }
            } else if (this.status === 404) {
                content.innerHTML = "<p>Halaman tidak Tersedia</p>"
            } else {
                content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
            }
        }
    }
        xhttp.open('GET', 'pages/' + page + '.html', true)
        xhttp.send()
    }
})
