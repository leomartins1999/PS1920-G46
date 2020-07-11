/// repository fields
const DB_NAME = 'tribute_db';
const COLLECTION_NAME = 'images';
const FILTER = ["content"];
const SEARCH = null;

const repo = require("../repository/T-repository")(DB_NAME, COLLECTION_NAME, FILTER, SEARCH)

module.exports = {
    postImage: postImage,
    getImage: getImage,
}

function postImage(image) {
    const index = {
        id: `${image.type}-${image.id}`,
        content: image.content
    }

    return repo.updateById(index.id, index)
}

function getImage(image) {
    return repo.selectById(image.query_options, `${image.type}-${image.id}`)
        .then(resp => resp.content.buffer)
}