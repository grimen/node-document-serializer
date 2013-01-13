var helper = require('./helper'),
    assert = helper.assert,
    debug = helper.debug;

// -----------------------
//  Spec: Serializer
// --------------------

module.exports = function(name, spec) {
  var Serializer = spec.module;
  var engine = spec.engine;
  var options = spec.options || {};
  var pack = spec.pack;
  var unpack = spec.unpack;
  var binary = spec.binary;

  var serializer;

  return (function() {
    var Spec = {};

    Spec.before = function() {
      serializer = new Serializer();
    };

    Spec[name] = {
      'new': {
        '()': function() {
          assert.instanceOf ( serializer, Serializer );

          Serializer.reset();

          var serializer2 = new Serializer();

          assert.equal ( serializer2.url, null );
          assert.typeOf ( serializer2.options, 'object' );
          assert.deepEqual ( serializer2.options.custom, undefined );
        },

        '(options)': function() {
          Serializer.reset();

          var serializer2 = new Serializer({custom: {foo: 'bar'}});

          assert.equal ( serializer2.url, null );
          assert.typeOf ( serializer2.options, 'object' );
          assert.deepEqual ( serializer2.options.custom, {foo: 'bar'} );
        }
      },

      '.klass': function() {
        assert.property ( serializer, 'klass' );
        assert.equal ( serializer.klass, Serializer );
      },

      '.defaults': function() {
        assert.property ( Serializer, 'defaults' );

        assert.equal ( Serializer.defaults.url, null );
        assert.typeOf ( Serializer.defaults.options, 'object' );
      },

      '.options': function() {
        assert.property ( Serializer, 'options' );
        assert.typeOf ( Serializer.options, 'object' );
        assert.deepEqual ( Serializer.options, options );
      },

      '.reset()': function() {
        assert.property ( Serializer, 'reset' );
        assert.typeOf ( Serializer.reset, 'function' );

        Serializer.options = {foo: "bar"};
        assert.deepEqual ( Serializer.options, {foo: "bar"} );

        Serializer.reset();

        assert.equal ( Serializer.url, null );
      }
    };

    Spec[name + '.prototype'] = {
      '#options': function() {
        assert.property ( serializer, 'options' );
        assert.typeOf ( serializer.options, 'object' );
      },

      '#engine': function() {
        assert.property ( serializer, 'engine' );
        assert.deepEqual ( serializer.engine, engine );
      },

      '#binary': function() {
        assert.property ( serializer, 'binary' );
        assert.equal ( serializer.binary, binary );
      },

      '#serialize': {
        '': function() {
          assert.property ( serializer, 'serialize' );
          assert.typeOf ( serializer.serialize, 'function' );
        },

        '(object)': function() {
          var object = {_id: 1, a: "foo", b: "bar"};

          assert.deepEqual ( serializer.serialize(object), pack({_id: 1, a: "foo", b: "bar"}) );
        }
      },

      '#deserialize': {
        '': function() {
          assert.property ( serializer, 'deserialize' );
          assert.typeOf ( serializer.deserialize, 'function' );
        },

        '(data)': function() {
          var data = pack({_id: 1, a: "foo", b: "bar"});

          assert.deepEqual ( serializer.deserialize(data), {_id: 1, a: "foo", b: "bar"} );
        }
      }
    };

    return Spec;
  }());
};

