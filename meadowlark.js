const express = require('express');
const app = express();

const fortune = require('./lib/fortune');

// set up handlebars view engine
const handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Set port nubmer
app.set('port', process.env.PORT || 3000);

// Static files
app.use(express.static(__dirname + '/public'));

// Routes
app.get('/', (req, res)=>{
    res.render('home');
});

app.get('/about', (req, res)=>{
    const randomFortune = fortune.getFortune();
    res.render('about', {fortune: randomFortune});
});

// custom 404 page
app.use((req, res)=>{
    res.status(404);
    res.render('404');
});

//custom 500 page
app.use((err, req, res, next)=>{
    console.log(err);
    res.status(500);
    res.render('500');
});


app.listen(app.get('port'), ()=>{
    console.log(`Server start on port: ${app.get('port')}`);
})