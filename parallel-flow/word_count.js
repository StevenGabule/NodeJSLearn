const fs = require('fs');
const tasks = [];
const wordCounts = {};
const filesDir = './text';
let completedTasks = 0;

function checkIfComplete() {
	completedTasks++;
	if (completedTasks === tasks.length) {
		for(let index in wordCounts) {
			console.log(`${index}: ${wordCounts[index]}`);
		}
	}
}

function addWordCount(word) {
	wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1;
}

function countWordsInText(text) {
	const words = text.toString().toLowerCase().split(/\W+/).sort();
	// counts word occurrences in text
	words.filter(word => word).forEach(word => addWordCount(word));
}

// gets a list of the fils in the text directory
fs.readdir(filesDir, (err, files) => {
	if (err) throw err;
	files.forEach(file => {
		// defines a task to handle each file. Each task includes a call to a function that
		// will asynchronously read the file and then count the file's word usage
		const task = (file => { 
			return () => {
					fs.readFile(file, (err, text) => {
					if (err) throw err;
					countWordsInText(text);
					checkIfComplete();
				});
			};
		})(`${filesDir}/${file}`);
		// add each task to an array of functions to call in parallel
		tasks.push(task);
	});
	// starts executing every tasks in parallel
	tasks.forEach(task => task());
});

