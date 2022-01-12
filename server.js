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
        //make barebones post /api/notes route
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

