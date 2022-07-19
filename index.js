//dependencies
const express = require('express');
const app = express();
const path = require('path');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const methodOverride = require('method-override');


//connect mongoose
mongoose.connect('mongodb://localhost:27017/wargameBlog').then(() => {
    console.log("we are connected to Mongo");
}).catch(err => {
    console.log("oh no, error, we are not connected to Mongo")
    console.log(err)
});


//middleware
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({
    extended: false
}));
app.use(methodOverride('_method'));
app.use('/articles', articleRouter)

//basic route
app.get('/', async (req, res)=>{
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('./articles/index', { articles: articles })
})


//start server
app.listen(3000, () => {
    console.log('serving on port 3000')
});