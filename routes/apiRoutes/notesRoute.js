const router = require('express').Router(); 
const notes = require('../../db/db.json');
const fs = require('fs');

//function to update notes database
function updateDb() {
    fs.writeFile("db/db.json", JSON.stringify(notes), function (err) {
        if (err) {
            console.log(err)
            return;
        }
        console.log("db.json has been updated");
    });
}

router.get('/notes', (req, res) => {
    console.log('Get request made')
    console.log(notes);
    res.json(notes); 
});

router.post('/notes', (req, res) => {
    req.body.id = notes.length + 1;
    var newNote = req.body;
    notes.push(newNote);
    updateDb();
    res.send(notes);
});

router.delete('/notes/:id', (req, res) => {
    let index = req.params.id;
    for (let i = 0; i < notes.length; i++) {
        if (index == notes[i].id) {
            notes.splice(i,1);
            console.log("Note with id " + index + " has been removed")
            break;
        }
    }
    updateDb();
    res.json(notes);
});
module.exports = router;