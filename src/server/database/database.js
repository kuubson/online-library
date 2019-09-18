const Grid = require('gridfs-stream')
const GridFsStorage = require('multer-gridfs-storage')
const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
let gridfs

const login = process.env.DB_LOGIN
const password = process.env.DB_PASSWORD
const database = `mongodb+srv://${login}:${password}@database-mzdui.mongodb.net/online-library?retryWrites=true&w=majority`

const storage = new GridFsStorage({
  url: database,
  options: {
    useNewUrlParser: true
  },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

module.exports = {
  database: (mongoose, app) => {
    mongoose.connect(database, { useNewUrlParser: true, useFindAndModify: false })
      .then(database => {
        console.log("Successfully connected to the database!")
        gridfs = Grid(database.connection.db, mongoose.mongo)
        gridfs.collection('uploads')
      })
      .catch(error => console.log("Something went wrong when connecting to database! " + error))
    app.get('/books/:filename', (req, res) => {
      gridfs.files.findOne({ filename: req.params.filename }, (error, file) => {
        const readstream = gridfs.createReadStream(file.filename)
        readstream.pipe(res)
      })
      // gridfs.files.find().toArray((error, files) => {
      //   console.log(files)
      // })
    })
  },
  gridfsUpload: upload
}
