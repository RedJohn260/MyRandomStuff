const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const os = require('os');

const app = express();

const httpport = 26993;
const localIpAddress = getLocalIpAddress();
const httpadress = "http://"+ localIpAddress.toString() + ":" + httpport.toString();

// Set up EJS template engine
app.set('view engine', 'ejs');

// Set the storage engine for Multer
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use the original filename
    },
  });
  

const upload = multer({
  storage: storage,
}).single('myFile'); // 'myFile' is the name of the file input field in your HTML form

// Static folder for uploaded files
app.use(express.static('./uploads'));
// folder for public files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    const msg = ''; // Initialize an empty message
    // Read the uploaded files from the 'uploads' directory and pass them to the template
    const fs = require('fs');
    fs.readdir('./uploads', (err, files) => {
      if (err) {
        console.error(err);
        res.render('index', { msg: 'Error reading files', files: [] });
      } else {
        // Filter out any system files (e.g., macOS .DS_Store)
        files = files.filter(file => !file.startsWith('.'));
        res.render('index', { msg, files });
      }
    });
  });

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      res.render('index', { msg: 'Error uploading file', files: [] });
    } else {
      res.redirect('/');
    }
  });
});

const PORT = process.env.PORT || httpport;
//app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Start the server
app.listen(PORT, () => {
    console.log("------------------------------------------------------------------------------------------------")
    console.log('Welcome to the Red Johns File Manager. Please use your web browser to connect to the website.');
    console.log("- connect to:");
    console.log(httpadress);
    console.log("------------------------------------------------------------------------------------------------")
  });

  function getLocalIpAddress() {
    // Get the network interfaces of the computer
    const networkInterfaces = os.networkInterfaces();
  
    // Find the IPv4 address of the network interface that is not a loopback address
    const localIp = Object.values(networkInterfaces)
      .flat()
      .filter(({ family, internal }) => family === 'IPv4' && !internal)
      .map(({ address }) => address)[0];
  
    // Return the local IP address as a string
    return localIp;
  }
