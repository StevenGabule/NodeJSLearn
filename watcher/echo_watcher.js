const Watcher = require('./Watcher')
const watcher = new Watcher(watchDir, processedDir);

watcher.on('process', (file) => {
    const watchFile = `${watchDir}/${file}`;
    const processedFile = `${processedDir}/${file.toLowercase}`;
    fs.rename(watchFile, processedFile, err => {
        if(err) throw err;
    });
});

watcher.start();
