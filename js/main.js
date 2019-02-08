let app = new Vue({

    el: "#app",

    data: {
        url: "https://api.myjson.com/bins/zyv02",
        searched: [],
        books: []
    },

    methods: {

        getData() {
            fetch(this.url, {
                    method: "GET",
                })
                .then(res => {
                    if (!res.ok) {
                        throw Error(res.status);
                    }
                    return res;
                })
                .then(data => {
                    return data.json();
                })
                .then(myData => {
                    app.books = myData.books;
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },

    computed: {

        filterSearchedBooks () {
            let searchedBooks = [];
            if (this.searched == "") {
                return this.books;
            } else {
                for (let i = 0; i < this.books.length; i++) {
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

    created () {
        this.getData();
        document.getElementById("noMatchingResult").style.display = "none";
    }
})