const fs = require('fs');
const path = require('path');

// Directory containing the files
const directoryPath = './assets/images'; // Replace with your directory path

// Read all files in the directory
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  let count = 1; // Counter for incremental file naming
  files.forEach((file) => {
    const oldPath = path.join(directoryPath, file);
    const newPath = path.join(directoryPath, `image${count}.jpeg`);
    
    // Rename the file
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.error(`Error renaming file ${file}:`, err);
      } else {
        console.log(`Renamed: ${file} -> image.${count}.jpeg`);
      }
    });

    count++;
  });
});