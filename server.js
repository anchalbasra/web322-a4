/********************************************************************************
*  WEB322 – Assignment 04
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Aanchal Basra
*  Student ID: 156175200
*  Date: 21/10/2023
*
*  Published URL: https://gray-dhole-toga.cyclic.app/
*
********************************************************************************/


const legoData = require("./modules/legoSets");
const express = require('express'); 
const app = express(); 
const HTTP_PORT = process.env.PORT || 8080; 
const path = require("path");
app.use(express.static('public')); 
app.use((req,res,next)=>{
    app.locals.currentRoute = req.path;
    next();
});
app.set('view engine', 'ejs');

// app.get('/', (req, res) => {
//     res.send('Assignment 2:  Aanchal Basra - 156175200');
// });

app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, "/views/home.html"))
    res.render("home");
});

app.get('/about', (req, res) => {
    // res.sendFile(path.join(__dirname, "/views/about.html"))
    res.render("about");
});


app.get('/lego/sets', (req, res) => {
    if(req.query.theme){
        legoData.getSetsByTheme(req.query.theme).then((legoSets=>{
            // res.json(setByNum);
            res.render("sets", {sets: legoSets});
        })).catch(err=>{
            // res.status(404).sendFile(path.join(__dirname, "/views/404.html"))
            res.status(404).render("404", {message: "Unable to find requested sets."});;

        });
    }
    else{
        legoData.getAllSets().then((legoSets=>{
            // res.json(allSets);
            res.render("sets", {sets: legoSets});
        })).catch(err=>{
            // res.status(404).sendFile(path.join(__dirname, "/views/404.html"))
            res.status(404).render("404", {message: "Unable to find requested sets."});
        });
    }
    
});

app.get('/lego/sets/:set_num', (req, res) => {
    legoData.getSetByNum(req.params.set_num).then((legoSet=>{
        // res.json(setByNum);
        res.render("set", {set: legoSet});

    })).catch(err=>{
        // res.json({message: "unable to find requested set"});
        // res.status(404).send(`unable to find requested set`);
        // res.status(404).sendFile(path.join(__dirname, "/views/404.html"))
        res.status(404).render("404", {message: "Unable to find requested set."});
    });
});

// app.get('/lego/sets/theme-demo', (req, res) => {
//     legoData.getSetsByTheme("Supplemental").then((setByNum=>{
//         res.json(setByNum);
//     })).catch(err=>{
//         res.json({message: "unable to find requested sets"});
//     });
// });

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, "/views/404.html"))
    res.status(404).render("404", {message: "I'm sorry, we're unable to find what you're looking for"});
});

legoData.initialize().then(()=>{
    app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));
}).catch((err)=>{
    console.log(err);
})
