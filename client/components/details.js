var Details = exports = {};

Details.controller = function(){
  var ctrl = this;
  ctrl.id = m.route.param('postID');
  ctrl.post = m.prop('');

  ctrl.get = function(){ //Make GET request to server to retrieve post
    m.request({method: 'GET', url: '/posts/'+ctrl.id})
    .then(function(postDetails){ctrl.post(postDetails); console.log(ctrl.post())});
  };

  ctrl.get();

};

Details.view = function(ctrl){
  return m('div', {class: 'detailView clearfix'}, [
    m('h3.title', ctrl.post().title),
    m('h5.author', ctrl.post().author),
    m('div.text', m.trust(markdown.toHTML(ctrl.post().content))),
    // function() {
    //   var prevIndex = thisIndex - 1;
    //   if (ctrl.posts()[prevIndex]) {
    //     return m('a.prev', {href: '#', onclick: ctrl.loadPrev}, 'Previous Post')
    //   };
    // }(),
    // function() {
    //   var nextIndex = thisIndex + 1;
    //   if (ctrl.posts()[nextIndex]) {
    //     return m('a.next', {href: '#', onclick: ctrl.loadNext}, 'Next Post')
    //   };        
    // }()
  ]);
}

// var thisIndex = ctrl.postIndices()[ctrl.selectedPost()];
