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
  ctrl.viewMode = m.prop('');

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

  ctrl.remove = function(idx) {
    ctrl.posts().splice(idx,1);
  };

  ctrl.get = function(){
    m.request({method: 'GET', url: '/posts'})
    .then(ctrl.postBuilder);
  };

  ctrl.postBuilder = function(posts){
    for (var i=0; i<posts.results.length; i++) {
      ctrl.viewMode('summary');
      ctrl.add(posts.results[i]);
    }
  };

  ctrl.aboutMode = function() {
    ctrl.viewMode('about');
  };

  ctrl.detailMode = function() {
    console.log(this.id)
  }
}

Posts.view = function (ctrl) {
  console.log('rendering view')
  return m('.app', [
    
    m('nav', {class: 'clearfix'}, [
      m('.social', [
        m('a', {class: 'follow', id: 'twitter', target:'_blank', href: 'https://twitter.com/westyler1'}, 'twitter'),
        m('a', {class: 'follow', id: 'github', target:'_blank', href: 'https://github.com/WesTyler'}, 'github'),
        m('a', {class: 'follow', id:  'linkedin', target:'_blank', href: 'https://www.linkedin.com/in/westyler405'}, 'linkedin')
      ]),
      m('ul', [
        m('li', [m('a',{class: 'navLink homeNav', href: '#', onclick: ctrl.get}, 'Home')]),
        m('li', [m('a',{class: 'navLink aboutNav', href: '#', onclick: ctrl.aboutMode}, 'About')])
        ]),
    ]),
    
    checkMode(ctrl)
  ])
}

function checkMode(ctrl) {
  if (ctrl.viewMode()==='summary') {
    return m('div', {class: 'summaryView clearfix'}, ctrl.posts().map(function(post){
      return m('.postSummary', {id: post.id(), onclick: ctrl.detailMode}, [
        m('h4',{class: 'title'}, post.title()),
        m('.summary', post.summary())
      ])
    }))
  } else if (ctrl.viewMode()==='detail') {
    // return m()
  } else if (ctrl.viewMode()==='about') {
    return m('div', {class: 'aboutView clearfix'}, [
      m('h3', 'About Me',[
        m('p', {class: 'about'}, "I'm a chemist-turned-web dev just trying to figure things out." )
      ]),
      m('h3', 'About This Blog', [
        m('p', {class: 'about'}, "This blog was built using Mithril, Node/Express, and MySQL.")
      ]) 
    ])
  };
}
