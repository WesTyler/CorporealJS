window.Corporeal = {};

Corporeal.controller = function() {
  var ctrl = this;
  ctrl.posts = m.prop([]); //initialize as empty array of posts
  ctrl.viewMode = m.prop(''); //determine which page to view
  ctrl.postIndices = m.prop({}); // keys = post_id, values = post index in ctrl.posts() array.
  ctrl.selectedPost = m.prop(0); //determine which post_id to view in detail
}

Corporeal.view = function(ctrl) {
  return m('.app', [
    
    m('nav.clearfix', [ //Nav bar and my social media links
      m('.heading', {class: 'clearfix'}, [
        m('.logo', [
          m('.logoMain', 'Corporeal'),
          m('.logoSub', 'JS')
        ]),
        m('.social', [
          m('a.follow', {id: 'twitter', target:'_blank', href: 'https://twitter.com/westyler1'}, 'twitter'),
          m('a.follow', {id: 'github', target:'_blank', href: 'https://github.com/WesTyler'}, 'github'),
          m('a.follow', {id:  'linkedin', target:'_blank', href: 'https://www.linkedin.com/in/westyler1'}, 'linkedin')
        ]),
      ]),
      m('ul', [
        m('li', [m('a',{class: 'navLink homeNav', href: '/', onclick: ctrl.get}, 'Home')]),
        m('li', [m('a',{class: 'navLink aboutNav', href: '/about', onclick: ctrl.aboutMode}, 'About')])
        ]),
    ]),
    // Div to load sub-views into.
    m('div', {class: 'contentHolder clearfix'})
    
  ])
}

m.route.mode = "hash";

m.route(document.getElementById('app'), "/", {
    "/": Corporeal,
    "/details": Details,
    "/about": About
})