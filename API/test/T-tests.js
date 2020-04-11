const request = require("request");
const assert = require("assert");
const mongo = require('mongodb');

// mongo
const MongoClient = mongo.MongoClient;
const URL = "mongodb://localhost:27017/";
const DB_NAME = "tribute_db";
const COLLECTION_NAME = "test";
const COLLECTION_FILTER = ["description", "age"];

const repository = require("../service/T-repository")(COLLECTION_NAME, COLLECTION_FILTER);
const TestDto = require("./TestDto");
const server = require("./T-test-server");

const objects = [
    new TestDto("5e821e64e069d32b7c840001","Name1", "Description1", 1),
    new TestDto("5e821e64e069d32b7c840002", "Name2", "Description2", 2),
    new TestDto("5e821e64e069d32b7c840003", "Name3", "Description3", 3),
    new TestDto("5e821e64e069d32b7c840005", "Name5", "Description5", 5)
];
const BASE_URI = server.baseURI;

describe('Repository Tests', () => {

    before(() => {
        return insert(objects[0])
            .then(() => insert(objects[1]))
            .then(() => insert(objects[2]));
    });

    after(() => {
        return dropCollection();
    });

    it('Select All', () => {
        return repository.select()
            .then(dtos => {
                assert.true(objects[0].equals(dtos[0]));
                assert.true(objects[1].equals(dtos[1]));
                assert.true(objects[2].equals(dtos[2]));
            })
    });

    it('Select by Id', () => {
        return repository.selectById("5e821e64e069d32b7c840003")
            .then(dto => {
                assert.true(objects[2].equals(dto));
            })
    });

    it("Insert with id", () => {
        return repository.insert(new TestDto("5e821e64e069d32b7c840004", "Name4", "Description4", 4));
    });

    it('Remove by id', () => {
        return repository.removeById("5e821e64e069d32b7c840005");
    });

    it('Update by id', () => {
        return repository.updateById("5e821e64e069d32b7c840003", {description: "new description"});
    });

});

describe('API tests', () => {

    before(() => {
        server.startServer()
    });

    after(() => {
        server.startServer()
    });

    describe('Unauthenticated Tests', () => {

        it('Get Volunteer', function (done) {
            const options = {

            };

            executeRequest()
        });

        it('Get Volunteer by Id', function (done) {
            done()
        });

        it('Get Orgs', function (done) {
            done()
        });

        it('Get Org By Id', function (done) {
            done()
        });

        it('Get Posts', function (done) {
            done()
        });

        it('Get Posts By Id', function (done) {
            done()
        });

        it('Get Events', function (done) {
            done()
        });

        it('Get Events by Org', function (done) {
            done()
        });

        it('Get Events by Id', function (done) {
            done()
        });

        it('Register in platform', function (done) {
            done()
        });

    });

    describe('Authenticated as org Tests', () => {

        it('Follow Volunteer', function (done) {
            done()
        });

        it('Follow Org', function (done) {
            done()
        });

        it('Create Post', function (done) {
            done()
        });

        it('Remove Post', function (done) {
            done()
        });

        it('Create Event', function (done) {
            done()
        });

        it('Remove Event', function (done) {
            done()
        });

        it('Like Post', function (done) {
            done()
        });

        it('Org confirms Volunteer in Event', function (done) {
            done()
        });

        it('Register as org', function (done) {
            done()
        });

    });

    describe('Authenticated as user Tests', () => {

        it('Follow Volunteer', function (done) {
            done()
        });

        it('Follow Org', function (done) {
            done()
        });

        it('Create Post', function (done) {
            done()
        });

        it('Remove Post', function (done) {
            done()
        });

        it('Like Post', function (done) {
            done()
        });

        it('Volunteer interested in Event', function (done) {
            done()
        });

        it('Register as volunteer', function (done) {
            done()
        });

    });

    describe('Authentication tests', () => {

        it('Authenticate', function (done) {
            done()
        });

        it('Logout', function (done) {
            done()
        });

    })

});

assert.true = (value) => assert.equal(true, value);

function accessCollection(){
    return MongoClient.connect(URL)
        .then(db => db.db(DB_NAME))
        .then(dbo => dbo.collection(COLLECTION_NAME));
}

function dropCollection(){
    return accessCollection()
        .then(col => col.drop());
}

function insert(obj){
    return accessCollection()
        .then(col => col.insertOne(obj))
}

function executeRequest(options, cb){
    request(options, cb);
}