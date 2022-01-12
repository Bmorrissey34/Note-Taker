//build standard express app

//routes
    //html routes
    //home route
        //send index.html
    //notes route
        //send notes.html
    
//API ROUTES
    //get api/notes
        //read db.json (need fs)
        //parse data into json
        //send json to front end
        //if this is working you will see notes in the app
    //POST /api/notes
        //make bare bones post /api/notes route
        //try console.log(req.body)
        //make new object with text and title keys
        //tack on ID (id) to that new object
        //read the file db.json -> parse into json -> push the new note onto array -> stringify data -> fs.writeFile

    //Bonus DELETE /api/note/:id
        //read the db.json -> 
        //parse into JSON -> 
        //find the note whose id matches the req param id -> 
        //stringify data -> 
        //fs.writeFile

        const fs = require('fs')
        const path = require('path');
        const api = require('./routes/index.js');
        const notes = require('./db/db.json');
        const { uuid } = require('uuidv4')
        const express = require('express');
        const PORT = process.env.PORT || 3001;
        
        const app = express();
        
        
        // Middleware for parsing JSON and urlencoded form data
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use('/api', api);
        
        app.use(express.static('public'));
        
        
        app.get('/', (req, res) =>
          res.sendFile(path.join(__dirname, '/public/index.html'))
        );
        
        app.get('/notes', (req, res) =>
          res.sendFile(path.join(__dirname, '/public/notes.html'))
        );
        
        app.get('/api/notes', (req, res) => {
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
          if (err) {
            console.error(err)  
          } else {
            res.json(JSON.parse(data))
          }
            
        })});
        
        app.post('/api/notes', (req, res) => {
          console.info(`${req.method} request received to add a note`);
        
        
          const { title, text} = req.body;
        
         
          if (title && text) {
           
            const newNote = {
              title,
              text,
              id: uuid()
            };
        
            const response = {
              status: 'success',
              body: newNote,
            };
            
            fs.readFile('./db/db.json', 'utf8', (err, data) => {
              if (err) {
                console.error(err);
              } else {
                const PRS = JSON.parse(data);
                PRS.push(newNote);
                fs.writeFile('./db/db.json', JSON.stringify(PRS), (err) => {
                  if (err) {
                    console.error(err)
                  } else {
                    res.json('Success')
                  }
                })
              }
            });
            console.log('success')
          } else {
            res.status(500).json('Error in posting review');
          }
        });
        
        app.get('*', (req, res) =>
          res.sendFile(path.join(__dirname, 'public/index.html'))
        );
        
        app.listen(PORT, () =>
          console.log(`App listening at http://localhost:${PORT} 🚀`)
        );