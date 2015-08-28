var Posts = exports = {
  model: function () {
    this.id = m.prop('');
    this.title = m.prop('');
    this.content = m.prop('');
    this.summary = m.prop('');
    this.author = m.prop('');
  }
}