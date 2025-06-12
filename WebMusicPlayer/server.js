const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

app.post('/upload', upload.single('audio'), (req, res) => {
  res.json({ url: `/uploads/${req.file.filename}` });
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));