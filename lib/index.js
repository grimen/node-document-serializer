require('sugar');
var fun = require('funargs');

// -----------------------
//  Constructor
// --------------------

// new Serializer ()
// new Serializer (options)
function Serializer () {
  var self = this, args = fun(arguments);

  self.klass = self.klass || Serializer;

  self.options = Object.merge(self.klass.defaults.options, args.objects()[0] || {}, true);
  self.engine = null;
  self.binary = false;
}

// -----------------------
//  Class
// --------------------

// .name
Serializer.__defineGetter__('name', function() {
  return this.name;
});

Serializer.defaults = {
  options: {}
};

Serializer.options = null;

Serializer.reset = function() {
  var self = this;

  if (self.defaults) {
    self.options = self.defaults.options;
  }
};

// -----------------------
//  Instance
// --------------------

// #name
Serializer.prototype.__defineGetter__('name', function() {
  return this.constructor.name;
});

// #serialize (object)
Serializer.prototype.serialize = function() {
  throw new Error("Not implemented");
};

// #deserialize (data)
Serializer.prototype.deserialize = function() {
  throw new Error("Not implemented");
};

// -----------------------
//  Export
// --------------------

Serializer.Spec = require('../test/adapter_spec');

module.exports = Serializer;
