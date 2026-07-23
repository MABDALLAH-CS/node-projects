const express = require('express');
const app = express();

app.listen(313);

app.get('/', (req, res) => {
    res.json({
        message: "we're listening"
    });
});

app.listen(313, 'local host', () => {
    console.log("server listening in port 313");
})