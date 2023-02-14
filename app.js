const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");
const port = 3000;

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("public"));


// set database
mongoose.set('strictQuery', true);

main().catch(err => console.log(err));

async function main() {
  mongoose.connect('mongodb://127.0.0.1:27017/wikiDB', {
        useNewUrlParser: true
    });
}

const articleSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
    },
    content: String,
});

const Article = mongoose.model("Article", articleSchema);

// // get request
// app.get("/articles", (req, res) => {
//     Article.find((err, foundArticles) => {
//         if (!err) {
//             res.send(foundArticles);
//         } else {
//             res.send(err);
//         }        
//     })
// })

// // post request
// app.post("/articles", (req, res) => {

//     const newArticle = new Article ({
//         title: req.body.title,
//         content: req.body.content,
//     });

//     newArticle.save((err) => {
//         if (!err){
//             res.send("Succefully add a new article.")
//         } else {
//             res.send(err)
//         }
//     });
// });

// // delete request
// app.delete("/articles", (req, res) => {
//     Article.deleteMany({},(err) => {
//         if (!err) {
//             res.send("Successfully deleted all articles.");
//         } else {
//             res.send(err);
//         }
//     });
// });

// app route method
app.route("/articles")
    .get((req, res) => {
        Article.find((err, foundArticles) => {
            if (!err) {
                res.send(foundArticles);
            } else {
                res.send(err);
            }        
        });
    })
    .post((req, res) => {

        const newArticle = new Article ({
            title: req.body.title,
            content: req.body.content,
        });
    
        newArticle.save((err) => {
            if (!err){
                res.send("Succefully add a new article.")
            } else {
                res.send(err)
            }
        });
    })
    .delete((req, res) => {
        Article.deleteMany({},(err) => {
            if (!err) {
                res.send("Successfully deleted all articles.");
            } else {
                res.send(err);
            }
        });
    });

app.route("/articles/:articleTitle")
    .get((req, res) => {
        Article.findOne({title: req.params.articleTitle}, (err, foundArticle) => {
            if (foundArticle) {
                res.send(foundArticle)
            } else {
                res.send("No article was found.")
            }
        })
    })
    .put((req, res) => {
        Article.replaceOne(
            {title: req.params.articleTitle},
            {
                title: req.body.title,
                content: req.body.content,
            },
            (err) => {
                if (!err) {
                    res.send("Successfully replaced article.");
                }
            }
        );
    })
    .patch((req, res) => {
        Article.updateOne(
            {title: req.params.articleTitle},
            {
                title: req.body.title,
                content: req.body.content,
            },
            (err) => {
                if (!err) {
                    res.send("Successfully updated article.")
                }
            }
        )
    })
    .delete((req, res) => {
        Article.deleteOne(
            {title: req.params.articleTitle},
            (err) => {
                if (!err) {
                    res.send("Successfuly deleted.")
                } else {
                    res.send(err)
                }
            }
        )
    });



app.listen(port, ()=> {
    console.log(`this server is runing at the port ${port}`);
});

