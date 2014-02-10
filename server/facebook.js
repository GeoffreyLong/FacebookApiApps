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
    getUserData: function() {
        var token = Meteor.user().services.facebook.accessToken;
        var query = ("q=SELECT actor_id, created_time, likes, post_id, attachment FROM stream WHERE filter_key IN ( SELECT filter_key FROM stream_filter WHERE uid = me() AND (name = 'Video'))");
        var fb_url = 'https://graph.facebook.com';
        var path = fb_url + '/fql?' + encodeURI(query) + '&method=GET&metadata=true&format=json&access_token=' + token;
        return (Meteor.http.get(path));
    }
});

