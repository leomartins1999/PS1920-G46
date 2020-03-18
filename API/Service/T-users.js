const users = {};

module.exports = () => {
    return {
        create: create,
        getAll: getAll,
        remove: remove
    }
};

function create(name, color) {
    return new Promise((resolve, reject) => {
       users[name] = {name: name, color: color};
       resolve("Success");
    });
}

function getAll(){
    return Promise.resolve(users);
}

function remove(name){
    return new Promise((resolve, reject) => {
        delete users[name];
        resolve("Success");
    })
}