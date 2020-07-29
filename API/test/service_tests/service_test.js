// npm dependencies
const request = require("request");
const assert = require("assert");

// server object
const server = require('./test-server')();

function executeRequest(options, cb){
    request(options, (error, resp, body) => cb(error, resp, JSON.parse(body)));
}

function login(user_type, done){
    const options = {
        url: `${server.baseURL}/login`,
        user_type: user_type,
        jar: true
    };

    return executeRequest(options, (err, res, bod) => ( (!err)?done() : assert.fail()) )
}

function logout(done){
    const options = {
        url: `${server.baseURL}/logout`
    };

    return executeRequest(options, (err, res, bod) => ( (!err)?done() : assert.fail()) )
}

describe('API tests', () => {

    before(() => {
        server.start()
    });

    after(() => {
        server.stop()
    });

    describe('Unauthenticated Tests', () => {

        it('Get Volunteers', function (done) {
            const options = {
                url: `${server.baseURL}/volunteers`
            };

            executeRequest(options, cb);

            function cb(error, resp, body){
                assert.equal(body.status, 'success');
                assert.equal(body.body.name, null);
                done();
            }
        });

        it('Get Volunteers(search name))', function (done) {
            const options = {
                url: `${server.baseURL}/volunteers?name=abc`
            };

            executeRequest(options, cb);

            function cb(error, resp, body){
                assert.equal(body.status, 'success');
                assert.equal(body.body.name,'abc');
                done();
            }
        });

        it('Get Volunteer by Id', function (done) {
            const options = {
                url: `${server.baseURL}/volunteers/1`
            };

            executeRequest(options, cb);

            function cb(error, resp, body){
                assert.equal(body.status, 'success');
                assert.equal(body.body._id, 1);
                done();
            }
        });

        it('Get Orgs', function (done) {
            const options = {
                url: `${server.baseURL}/orgs`
            };

            executeRequest(options, cb);

            function cb(error, resp, body){
                assert.equal(body.status, 'success');
                assert.equal(body.body.name, null);
                done();
            }
        });

        it('Get Orgs(search name)', function (done) {
            const options = {
                url: `${server.baseURL}/orgs?name=org1`
            };

            executeRequest(options, cb);

            function cb(error, resp, body){
                assert.equal(body.status, 'success');
                assert.equal(body.body.name, 'org1');
                done();
            }
        });

        it('Get Org By Id', function (done) {
            const options = {
                url: `${server.baseURL}/orgs/1`
            };

            executeRequest(options, cb);

            function cb(error, resp, body){
                assert.equal(body.status, 'success');
                assert.equal(body.body._id, '1');
                done();
            }
        });

        it('Get Posts', function (done) {
            const options = {
                url: `${server.baseURL}/posts`
            };

            executeRequest(options, cb);

            function cb(error, resp, body){
                assert.equal(body.status, 'success');
                done();
            }
        });

        it('Get Posts(search owner_id)', function (done) {
            const options = {
                url: `${server.baseURL}/posts?owner_id=1`
            };

            executeRequest(options, cb);

            function cb(error, resp, body){
                assert.equal(body.status, 'success');
                assert.equal(body.body.owner_id, '1');
                done();
            }
        });

        it('Get Posts By Id', function (done) {
            const options = {
                url: `${server.baseURL}/posts/1`
            };

            executeRequest(options, cb);

            function cb(error, resp, body){
                assert.equal(body.status, 'success');
                assert.equal(body.body._id, '1');
                done();
            }
        });

        it('Get Events', function (done) {
            const options = {
                url: `${server.baseURL}/orgs/events`
            };

            executeRequest(options, cb);

            function cb(error, resp, body){
                assert.equal(body.status, 'success');
                done();
            }
        });

        it('Get Events by Org', function (done) {
            const options = {
                url: `${server.baseURL}/orgs/1/events`
            };

            executeRequest(options, cb);

            function cb(error, resp, body){
                assert.equal(body.status, 'success');
                assert.equal(body.body.org_id, '1');
                done();
            }
        });

        it('Get Event by Id', function (done) {
            const options = {
                url: `${server.baseURL}/events/1`
            };

            executeRequest(options, cb);

            function cb(error, resp, body){
                assert.equal(body.status, 'success');
                assert.equal(body.body._id, '1');
                done();
            }
        });

        it('Register volunteer', function (done){
            const options = {
                url: `${server.baseURL}/register`,
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email: "abc@abc.com",
                    password: "12345678",
                    user_type: "volunteer",
                    data: {
                        name: "ABC DEF"
                    }
                })
            };

            executeRequest(options, cb);

            function cb(error, resp, body){
                assert.equal(body.status, 'success');
                done();
            }
        });

        it('Register Organization', function (done){
            const options = {
                url: `${server.baseURL}/register`,
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email: "abc@abc.com",
                    password: "12345678",
                    user_type: "org",
                    data: {
                        name: "ABC DEF"
                    }
                })
            };

            executeRequest(options, cb);

            function cb(error, resp, body){
                assert.equal(body.status, 'success');
                done();
            }
        });

    });

});