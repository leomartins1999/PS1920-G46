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
        user_type: user_type
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
                url: `${server.baseURL}/orgs/1/events/1`
            };

            executeRequest(options, cb);

            function cb(error, resp, body){
                assert.equal(body.status, 'success');
                assert.equal(body.body.org_id, '1');
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

    describe('Authenticated as org Tests', () => {

        before(function (done){
            return login('org', done);
        });

        after(function (done){
            return logout(done);
        });

        it('Follow Volunteer', function (done) {
            const options = {
                url: `${server.baseURL}/auth/volunteers/1/follow`,
                method: 'PUT'
            };

            executeRequest(options, cb);

            function cb(error, resp, body){
                assert.equal(body.status, 'success');
                assert.equal(body.auth_id, 1);
                assert.equal(body.volunteer_id, 1);
                done();
            }
        });

        it('Follow Org', function (done) {
            const options = {
                url: `${server.baseURL}/auth/orgs/1/follow`,
                method: 'PUT'
            };

            executeRequest(options, cb);

            function cb(error, resp, body){
                assert.equal(body.status, 'success');
                assert.equal(body.auth_id, 1);
                assert.equal(body.org_id, 2);
                done();
            }
        });

        it('Create Post', function (done) {
            const options = {
                url: `${server.baseURL}/auth/posts`,
                method: 'POST',
                body: JSON.stringify({
                    description: 'abc'
                })
            };

            executeRequest(options, cb);

            function cb(error, resp, body){
                assert.equal(body.status, 'success');
                assert.equal(body.auth_id, 1);
                assert.equal(body.description, 'abc');
                done();
            }
        });

        it('Remove Post', function (done) {
            const options = {
                url: `${server.baseURL}/auth/posts/1`,
                method: 'DELETE'
            };

            executeRequest(options, cb);

            function cb(error, resp, body){
                assert.equal(body.status, 'success');
                assert.equal(body.auth_id, 1);
                assert.equal(body.post_id, 1);
                done();
            }
        });

        it('Create Event', function (done) {
            const options = {
                url: `${server.baseURL}/auth/orgs/events`,
                method: 'POST',
                body: JSON.stringify({
                    name: 'event',
                    description: 'abc'
                })
            };

            executeRequest(options, cb);

            function cb(error, resp, body){
                assert.equal(body.status, 'success');
                assert.equal(body.auth_id, 1);
                assert.equal(body.event_id, 1);
                assert.equal(body.name, 'event');
                assert.equal(body.description, 'abc');
                done();
            }
        });

        it('Remove Event', function (done) {
            const options = {
                url: `${server.baseURL}/auth/orgs/events/1`,
                method: 'DELETE'
            };

            executeRequest(options, cb);

            function cb(error, resp, body){
                assert.equal(body.status, 'success');
                assert.equal(body.auth_id, 1);
                assert.equal(body.event_id, 1);
                done();
            }
        });

        it('Like Post', function (done) {
            const options = {
                url: `${server.baseURL}/auth/posts/1/like`,
                method: 'PUT'
            };

            executeRequest(options, cb);

            function cb(error, resp, body){
                assert.equal(body.status, 'success');
                assert.equal(body.auth_id, 1);
                assert.equal(body.post_id, 1);
                done();
            }
        });

        it('Org confirms Volunteer in Event', function (done) {
            const options = {
                url: `${server.baseURL}/auth/orgs/events/1/participate?volunteer_id=2`,
                method: 'PUT'
            };

            executeRequest(options, cb);

            function cb(error, resp, body){
                assert.equal(body.status, 'success');
                assert.equal(body.auth_id, 1);
                assert.equal(body.volunteer_id, 2);
                done();
            }
        });

    });

    describe('Authenticated as user Tests', () => {

        before(function (done){
            return login('volunteer', done);
        });

        after(function (done){
            return logout(done);
        });

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