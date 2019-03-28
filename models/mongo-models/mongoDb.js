const MongoClient = require('mongodb').MongoClient;

let state = {
    client: null
}

exports.connect = (url, done) => {
    if (state.client) {
        return done();
    }

    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            return done(err);
        }
        state.client = client.db("userProfiles");
        done();
    })
}

exports.get = () => {
    return state.client;
}