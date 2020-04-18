const fs = require('fs');

module.exports = (baseDir) => {

    return {
        postImage: postImage,
        getImage: getImage,
    };

    /**
     * Stores an image in the server base directory for images
     * @param image Image object, w/ content and specifications
     * @returns {Promise<unknown>} resolves with url to image if successful
     * rejects with error otherwise
     */
    function postImage(image) {
        return new Promise((resolve, reject) => {
            fs.writeFile(`${baseDir}/${image.type}/${image.id}.png`, image.content, function (err) {
                if (err) return reject(err);
                else return resolve({url: `/images/${image.type}/${image.id}`});
            })
        })
    }

    /**
     * Gets an image, stored in the base directory for images
     * @param image Image object, with necessary specifications
     * @returns {Promise<unknown>} 
     */
    function getImage(image){
        return new Promise((resolve, reject) => {
            fs.readFile(`${baseDir}/${image.type}/${image.id}.png`, function (err, data){
                if (err) return reject(err);
                else return resolve(data);
            })
        })
    }

};