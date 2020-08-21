"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Post = /** @class */ (function () {
    function Post(owner_id, user_type, body) {
        this.time = Date.now();
        /**
         * dictionary<id, user_type> of users that liked this post
         */
        this.likes = {};
        this.nrLikes = 0;
        this.owner_id = owner_id;
        this.owner_type = user_type;
        this.body = body;
    }
    return Post;
}());
exports.default = Post;
