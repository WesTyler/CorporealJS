var Home = exports = {};

Home.controller = function(){
  var ctrl = this;
  ctrl.posts = m.prop([]); //initialize as empty array of posts
  ctrl.postIndices = m.prop({}); // keys = post_id, values = post index in ctrl.posts() array.
  ctrl.selectedPost = m.prop(0); //determine which post_id to view in detail

  ctrl.add = function(postObj) {
    //check ctrl.posts to see if the post is already in posts
    var alreadySeen=false;
    for (var i=0; i<ctrl.posts().length; i++) {
      if (postObj['id'] === ctrl.posts()[i].id()) {
        alreadySeen = true;
      }
    }
    if (!alreadySeen){
      var newPost = new Posts.model(); //makes new empty model
      newPost.id(postObj['id']); //use model m.prop to set values
      newPost.title(postObj['title']);
      newPost.content(postObj['content']);
      newPost.summary(postObj['summary']);
      newPost.author(postObj['username']);
      ctrl.posts().push(newPost); //add to array of posts
      ctrl.postIndices()[newPost.id()] = ctrl.posts().indexOf(newPost);
    };
  };

  ctrl.get = function(){ //Make GET request to server to retrieve posts
    m.request({method: 'GET', url: '/posts'})
    .then(ctrl.postBuilder);
  };

  ctrl.postBuilder = function(posts){ //Iterate over server response to add new posts to the page
    for (var i=posts.results.length-1; i>=0; i--) {
      ctrl.add(posts.results[i]);
    }
  };

  ctrl.get(); // Get posts on initial view load
};

Home.view = function(ctrl){
  return m('div', {class: 'summaryView clearfix'}, ctrl.posts().map(function(post){
    return m('.postSummary', {id: post.id(), onclick: ctrl.detailMode}, [
      m('h4.title', post.title()),
      m('.summary', m.trust(post.summary()))
    ])
  }));
}