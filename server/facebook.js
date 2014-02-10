/*function Facebook(accessToken) {
    this.fb = Meteor.require('fbgraph');
    this.accessToken = accessToken;
    this.fb.setAccessToken(this.accessToken);
    this.options = {
        timeout: 3000,
        pool: {maxSockets: Infinity},
        headers: {connection: "keep-alive"}
    }
    this.fb.setOptions(this.options);
}

Facebook.prototype.query = function(query, method) {
	var self = this;
	var method = (typeof method === 'undefined') ? 'get' : method;
	var data = Meteor.sync(function(done) {
		self.fb[method](query, function(err, res) {
			done(null, res);
			});
		});
	return data.result;
}

Facebook.prototype.getUserData = function() {
    return this.query('me/photos');
} */ 

Meteor.methods({
	getFriendCount: function () {
		var token = Meteor.user().services.facebook.accessToken;
        var query = ("q=SELECT friend_count FROM user WHERE uid = me()");
        var fb_url = 'https://graph.facebook.com';
        var path = fb_url + '/fql?' + encodeURI(query) + '&method=GET&metadata=true&format=json&access_token=' + token;
        return (Meteor.http.get(path));
	},
	getVideos: function(startNum, endNum) {
    	var token = Meteor.user().services.facebook.accessToken;
        var query = ("q=SELECT embed_html FROM video WHERE owner IN (SELECT uid2 FROM friend WHERE uid1 = me() LIMIT "+ startNum + " OFFSET " + endNum + ") AND (strpos(lower(description),lower('neknomination')) >=0 OR strpos(lower(description),lower('neknom')) >=0 OR strpos(lower(description),lower('necknom')) >=0)");
        var fb_url = 'https://graph.facebook.com';
        var path = fb_url + '/fql?' + encodeURI(query) + '&method=GET&metadata=true&format=json&access_token=' + token;
        return (Meteor.http.get(path));
    }
});

