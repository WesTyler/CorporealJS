var Posts = {};

Posts.model = function () {
  this.id = m.prop('');
  this.title = m.prop('');
  this.content = m.prop('');
  this.summary = m.prop('');
  this.author = m.prop('');
}

Posts.controller = function () {
  var ctrl = this;
  ctrl.posts = m.prop([]); //initialize as empty array of posts
  ctrl.viewMode = m.prop(''); //determine which page to view
  ctrl.selectedPost = m.prop(0); //determine which post to view in detail

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
    };
  };

  ctrl.get = function(){ //Make GET request to server to retrieve posts
    m.request({method: 'GET', url: '/posts'})
    .then(ctrl.postBuilder);
  };

  ctrl.postBuilder = function(posts){ //Iterate over server response to add new posts to the page
    for (var i=0; i<posts.results.length; i++) {
      ctrl.viewMode('summary');
      ctrl.add(posts.results[i]);
    }
  };

  ctrl.aboutMode = function() { //View the 'About' page
    ctrl.viewMode('about');
  };

  ctrl.detailMode = function() { //View the selected post's detail page
    ctrl.selectedPost(this.id);
    ctrl.viewMode('detail');
  };

  ctrl.loadPrev = function() { //View previous post
    var temp = ctrl.selectedPost();
    temp--;
    ctrl.selectedPost(temp);
  };

  ctrl.loadNext = function() { //View next post
    var temp = ctrl.selectedPost();
    temp++;
    ctrl.selectedPost(temp);
  };
}

Posts.view = function (ctrl) {
  return m('.app', [
    
    m('nav.clearfix', [ //Nav bar and my social media links
      m('.social', [
        m('a.follow', {id: 'twitter', target:'_blank', href: 'https://twitter.com/westyler1'}, 'twitter'),
        m('a.follow', {id: 'github', target:'_blank', href: 'https://github.com/WesTyler'}, 'github'),
        m('a.follow', {id:  'linkedin', target:'_blank', href: 'https://www.linkedin.com/in/westyler405'}, 'linkedin')
      ]),
      m('ul', [
        m('li', [m('a',{class: 'navLink homeNav', href: '#', onclick: ctrl.get}, 'Home')]),
        m('li', [m('a',{class: 'navLink aboutNav', href: '#', onclick: ctrl.aboutMode}, 'About')])
        ]),
    ]),
    
    checkMode(ctrl) //Check which body content type to display
  ])
}

function checkMode(ctrl) {
  if (ctrl.viewMode()==='summary') {
    return m('div', {class: 'summaryView clearfix'}, ctrl.posts().map(function(post){
      return m('.postSummary', {id: post.id(), onclick: ctrl.detailMode}, [
        m('h4.title', post.title()),
        m('.summary', post.summary())
      ])
    }));
  } else if (ctrl.viewMode()==='detail') {
    return m('div', {class: 'detailView clearfix'}, [
      m('h3.detail', ctrl.posts()[ctrl.selectedPost()-1].title()),
      m('h5.author', ctrl.posts()[ctrl.selectedPost()-1].author()),
      m('p.text', ctrl.posts()[ctrl.selectedPost()-1].content()),
      function() {
        if (ctrl.posts()[ctrl.selectedPost()-2]) {
          return m('a.prev', {href: '#', onclick: ctrl.loadPrev}, 'Previous Post')
        };
        if (ctrl.posts()[ctrl.selectedPost()]) {
          return m('a.next', {href: '#', onclick: ctrl.loadNext}, 'Next Post')
        };        
      }()
    ]);
  } else if (ctrl.viewMode()==='about') {
    return m('div', {class: 'aboutView clearfix'}, [
      m('h3', 'About Me',[
        m('p.about', "I'm a chemist-turned-web dev just trying to figure things out." )
      ]),
      m('h3', 'About This Blog', [
        m('p.about', "This blog was built using Mithril, Node/Express, and MySQL.")
      ]) 
    ])
  } else {
    ctrl.viewMode('summary');
    ctrl.get();
  }
}
