function Facebook(accessToken) {
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

/* Facebook.prototype.query = function(query, method) {
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

get_data = function(user_id, path, fql) {
    var token = Meteor.users.findOne(user_id).services.facebook.accessToken,
        fb_url = 'https://graph.facebook.com',
        response;
 

        console.log (Meteor.http.get(fb_url + '/fql?q=' + fql + '&access_token=' + encodeURIComponent(token));

};



var query = 'q=SELECT uid, name, is_app_user FROM user WHERE uid IN (SELECT uid1 FROM friend WHERE uid2=me()) and is_app_user=1';
var options = {
    host: 'graph.facebook.com',
    port: 443,
    path: '/fql?' + encodeURI(query) + '&method=GET&metadata=true&format=json&access_token=' + accessToken
};


Meteor.methods({
    getUserData: function() {
        var query = ("q=SELECT actor_id, created_time, likes, post_id, attachment FROM stream WHERE filter_key IN ( SELECT filter_key FROM stream_filter WHERE uid = me() AND (name = 'Video'))");
        var fb_url = 'graph.facebook.com'
        path: '/fql?' + encodeURI(query) + '&method=GET&metadata=true&format=json&access_token=' + accessToken
        
        Meteor.http.get(fb_url + path + '?access_token=' + encodeURIComponent(token));

        fql({token: Meteor.user().services.facebook.accessToken}).query(query, function(err, data) {
            if (err) {
                throw err;
            }
        console.log(data); // [ { name: 'John Doe' } ]
    });
    }
});
