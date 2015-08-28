function MessageBag(a) {
  if (isEmpty(a)) a = {};
  this.m = {};
  this.merge(a||{});
  this.format = null;
};
MessageBag.prototype.class = 'MessageBag';
MessageBag.prototype.add=function(k,v){
  if (!this.m[k]) this.m[k] = [v]; else this.m[k].push(v);
  return this;
};
MessageBag.prototype.merge=function(b){
  if (typeof b.getMessages == 'function') b = b.getMessages();
  for(var k in b)
  {
      if (typeof b[k] === 'string') b[k] = [b[k]];
      if (!this.m[k])
      {
          this.m[k] = b[k];
      }
      else
      {
          this.m[k].concat(b[k]);
      }
  }
  return this;
};
MessageBag.prototype.has=function(k){
  return this.m[k] && this.m[k].length;
};
MessageBag.prototype.first=function(k,f){
  f = f||this.format||':message';
  if (this.m[k]) return f.replace(':message',this.m[k][0]);
  return null;
};
MessageBag.prototype.get=function(k,f){
  f = f||this.format||':message';
  var b = this.m[k]||[];
  return b.map(function(e){
    return f.replace(':message',e);
  });
};
MessageBag.prototype.all=function(f){
  var a = [];
  for(var k in this.m)
  {
    a = a.concat(this.m[k]);
  }
  return a;
};
MessageBag.prototype.setFormat=function(f){
  this.format = f; return this;
};
MessageBag.prototype.getFormat=function(f){
  return this.format;
};
MessageBag.prototype.any=function(){
  return !!this.count();
};
MessageBag.prototype.count=function(k){
  if (k) return this.get(k).length;
  return this.all().length;
};
MessageBag.prototype.getMessages=function(k,v){
  return this.m;
};
MessageBag.prototype.sprinkle = function(sel,f,insert){
  sel = sel||$('body');
  f = f||'<div><span class="label label-danger">:message</span></div>';
  insert = insert || function(key,message,bag,sel,format,insert)
  {
      var $fg = $(sel).find('[name="'+key+'"]').parents('.form-group');
      
      $fg.addClass('has-error');

      var $ig = $fg.find('.input-group');

      if (!$ig.exists()) $ig = $fg.find('.form-control');
      if (!$ig.exists()) $ig = $fg;
      
      $ig.after( format.replace(':message',message) );
  };
  for (var k in this.m)
  {
      if (this.m[k].length)
      {
          for (var x = 0; x < this.m[k].length; x++)
          {
              insert(k,this.m[k][x],this,sel,f,insert);
          }
      }
  }
};
MessageBag.prototype.toUL = function(options)
{
    options = options||{};
    options.alert_class = options.alert_class||'alert alert-danger';

    var mb = this;

    if (mb.count())
    {
        var text = '';
        
        for(var key in this.m)
        {
            if (this.m.hasOwnProperty(key))
            {
                for(var i in this.m[key])
                {
                    if (this.m[key].hasOwnProperty(i))
                    {
                        text += '<li data-key="'+key+'">'+this.m[key][i]+'</li>';
                    }
                }
            }
        }
        
        text = '<ul>'+text+'</ul>';

        return '<div class="'+options.alert_class+'">'+text+'</div>';
    }
};
