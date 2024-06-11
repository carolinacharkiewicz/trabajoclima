const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

mongoose.connect('mongodb://localhost:27017/clima', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const searchSchema = new mongoose.Schema({
    city: String,
    date: { type: Date, default: Date.now },
});

const Search = mongoose.model('Search', searchSchema);

app.use(cors());
app.use(express.json());

app.post('/api/search', async (req, res) => {
    const { city } = req.body;
    const search = new Search({ city });
    await search.save();
    res.send(search);
});

app.get('/api/search', async (req, res) => {
    const searches = await Search.find().sort({ date: -1 });
    res.send(searches);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
