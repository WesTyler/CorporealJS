var About = exports = {};

About.controller = function(){};

About.view = function(){
  return m('div', {class: 'aboutView clearfix'}, [
      m('h3.aboutHeader', 'About Me'),
      m('p.about', "I'm a full-stack software engineer, currently building JavaScript apps. I also have a heavy background in data analysis using Python." ),
      m('h3.aboutHeader', 'About This Blog'),
      m('p.about', "This blog was built using Mithril, Node/Express, and PostgreSQL.")
    ])
}