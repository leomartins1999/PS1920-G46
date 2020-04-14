const fs = require('fs');

module.exports = (baseDir) => {

    return {
        postImage: postImage,
        getImage: getImage,
    };

    function postImage(image) {
        return new Promise((resolve, reject) => {
            fs.writeFile(`${baseDir}/${image.type}/${image.id}.png`, image.content, function (err) {
                if (err) return reject(err);
                else return resolve({url: `/images/${image.type}/${image.id}`});
            })
        })
    }

    function getImage(image){
        return new Promise((resolve, reject) => {
            fs.readFile(`${baseDir}/${image.type}/${image.id}.png`, function (err, data){
                if (err) return reject(err);
                else return resolve(data);
            })
        })
    }

};