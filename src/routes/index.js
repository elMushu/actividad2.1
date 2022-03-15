const { Router } = require('express');
const router = Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const json_cards = fs.readFileSync('src/cards.json', 'utf-8');
let cards = JSON.parse(json_cards);

router.get('/', (req, res) => {
    res.render('index.ejs', {
        cards
    })
})

router.get('/new-entry', (req, res) => {
    res.render('new-entry');
})

router.post('/new-entry', (req, res) => {
    const { Name, Year, Picture, Rating } = req.body;
    if (!Name || !Year || !Picture || !Rating) {
        res.status(400).send('Entries must have Name')
        return;
    }

    let newCard = {
        id: uuidv4(),
        Name,
        Year,
        Picture,
        Rating
    };

    cards.push(newCard);

    const json_cards = JSON.stringify(cards);
    fs.writeFileSync('src/cards.json', json_cards, 'utf-8');

    res.redirect('/');
});

router.get('/delete/:id', (req, res) => {
    cards = cards.filter(card => card.id != req.params.id); //Recorre el arreglo, quita el libro que eliminamos y actualiza el arreglo
    const json_cards = JSON.stringify(cards);
    fs.writeFileSync('src/cards.json', json_cards, 'utf-8');
    res.redirect('/');
})

module.exports = router;