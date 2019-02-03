var app = new Vue({

    el: "#app",

    data: {
        url: "https://api.myjson.com/bins/zyv02",
        searched: [],
        books: []


    },

    methods: {

        getData: function () {
            fetch(this.url, {
                    method: "GET",
                })
                .then(function (res) {
                    if (!res.ok) {
                        throw Error(res.status);
                    }
                    return res;
                })
                .then(function (data) {
                    return data.json();
                })
                .then(function (myData) {
                    app.books = myData.books;
                })
                .catch(function (err) {
                    console.log(err);
                })
        }
    },

    computed: {

        filterSearchedBooks: function () {
            var searchedBooks = [];
            if (this.searched == "") {
                return this.books;
            } else {
                for (var i = 0; i < this.books.length; i++) {
                    if (this.books[i].title.toLowerCase().includes(this.searched.toLowerCase()) || this.books[i].description.toLowerCase().includes(this.searched.toLowerCase())) {
                        document.getElementById("noMatchingResult").style.display = "none";
                        searchedBooks.push(this.books[i]);
                    } else if (searchedBooks.length === 0) {
                        document.getElementById("noMatchingResult").style.display = "block";
                    }
                }
                return searchedBooks;
            }
        }

    },

    created: function () {
        this.getData();
        document.getElementById("noMatchingResult").style.display = "none";
    }
})