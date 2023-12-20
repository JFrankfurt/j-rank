const fs = require('fs')

// Function to remove specified keys from an object
function removeKeys(obj, keysToRemove) {
  keysToRemove.forEach((key) => {
    if (key in obj) {
      delete obj[key]
    }
  })

  // Recursively remove keys from nested objects
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      removeKeys(obj[key], keysToRemove)
    }
  }
}

// Function to process the JSON array
function processJsonArray(inputArray) {
  const keysToRemove = [
    'seed',
    'guid',
    'weightClass',
    'city',
    'zipCode',
    'state',
    'identityPersonGuid',
  ]

  inputArray.forEach((item) => {
    removeKeys(item, keysToRemove)
  })

  return inputArray
}

function loadJsonFromFile(filePath) {
  try {
    const fileData = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileData)
  } catch (error) {
    console.error('Error reading file:', error)
    return null
  }
}

// Function to load JSON data from a file
function loadJsonFromFile(filePath) {
    try {
        const fileData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileData);
    } catch (error) {
        console.error('Error reading file:', error);
        return null;
    }
}

// Function to save JSON data to a file
function saveJsonToFile(data, filePath) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log('Data successfully saved to:', filePath);
    } catch (error) {
        console.error('Error writing file:', error);
    }
}

// File paths
const inputFile = 'data/athletes.json'
const outputFile = 'data/athletes-modified.json'

// Load, process, and save the JSON data
const jsonData = loadJsonFromFile(inputFile);
if (jsonData) {
    const processedData = processJsonArray(jsonData);
    saveJsonToFile(processedData, outputFile);
}