var Details = exports = {};

Details.controller = function(){
  var ctrl = this;
  ctrl.id = m.route.param('postID');
  ctrl.post = m.prop('');

  ctrl.get = function(){ //Make GET request to server to retrieve post
    m.request({method: 'GET', url: '/posts/'+ctrl.id})
    .then(function(postDetails){console.log(postDetails)});
  };

  ctrl.get();

};

Details.view = function(ctrl){
  return m('.contentContainer', ctrl.post())
}

// var thisIndex = ctrl.postIndices()[ctrl.selectedPost()];
// return m('div', {class: 'detailView clearfix'}, [
//   m('h3.title', ctrl.posts()[thisIndex].title()),
//   m('h5.author', ctrl.posts()[thisIndex].author()),
//   m('div.text', m.trust(markdown.toHTML(ctrl.posts()[thisIndex].content()))),
//   function() {
//     var prevIndex = thisIndex - 1;
//     if (ctrl.posts()[prevIndex]) {
//       return m('a.prev', {href: '#', onclick: ctrl.loadPrev}, 'Previous Post')
//     };
//   }(),
//   function() {
//     var nextIndex = thisIndex + 1;
//     if (ctrl.posts()[nextIndex]) {
//       return m('a.next', {href: '#', onclick: ctrl.loadNext}, 'Next Post')
//     };        
//   }()
// ]);
