import express from "express"
import bodyParser from 'body-parser';
import axios from "axios";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))
/*---------------------------------------- */
app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.post("/enviar", async (req, res) => {
    var escolha = req.body.chose;
    var aleatorio = Math.floor(Math.random() * 100);
    try {
        const response = await axios.get('http://www.thecocktaildb.com/api/json/v1/1/filter.php?' + escolha);
        var drinkChoose = response.data.drinks[aleatorio]
        const response2 = await axios.get('http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drinkChoose.idDrink);
        var instruction = response2.data.drinks[0].strInstructions
        res.render("index.ejs", {
            contents: drinkChoose.strDrink.replace(/'/g, ''),
            image: drinkChoose.strDrinkThumb,
            recep: instruction
        })
    } catch (error) {
        res.send({
            error: 'Error',
            message: error.message
        })
    }
})

app.listen(3000, console.log("listem on port 3000"))