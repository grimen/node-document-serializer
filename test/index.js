var helper = require('./helper'),
    assert = helper.assert,
    debug = helper.debug;

var Serializer = require('..'),
    serializer = new Serializer();

// -----------------------
//  Test
// --------------------

module.exports = {

  'Serializer': {
    'new': {
      '()': function() {
        assert.instanceOf ( serializer, require('..') );

        Serializer.reset();

        var serializer2 = new Serializer();

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

    '.name': function() {
      assert.property ( Serializer, 'name' );
      assert.equal ( Serializer.name, 'Serializer' );
    },

    '.defaults': function() {
      assert.property ( Serializer, 'defaults' );

      assert.typeOf ( Serializer.defaults.options, 'object' );
    },

    '.options': function() {
      assert.property ( Serializer, 'options' );
      assert.typeOf ( Serializer.options, 'null' );
    },

    '.reset()': function() {
      assert.property ( Serializer, 'reset' );
      assert.typeOf ( Serializer.reset, 'function' );

      Serializer.options = {foo: "bar"};
      assert.deepEqual ( Serializer.options, {foo: "bar"} );
      assert.deepEqual ( Serializer.defaults.options, {} );

      Serializer.reset();

      assert.equal ( Serializer.options, Serializer.defaults.options );
    }
  },

  'Serializer.prototype': {
    '.name': function() {
      assert.property ( serializer, 'name' );
      assert.equal ( serializer.name, 'Serializer' );
    },

    '#options': function() {
      assert.property ( serializer, 'options' );
      assert.typeOf ( serializer.options, 'object' );
    },

    '#engine': function() {
      assert.property ( serializer, 'engine' );
      assert.typeOf ( serializer.engine, 'null' );
    },

    '#binary': function() {
      assert.property ( serializer, 'binary' );
      assert.typeOf ( serializer.binary, 'boolean' );
      assert.equal ( serializer.binary, false );
    },

    '#serialize': function() {
      assert.property ( serializer, 'serialize' );
      assert.typeOf ( serializer.serialize, 'function' );
      assert.throws ( serializer.serialize, Error );
    },

    '#deserialize': function() {
      assert.property ( serializer, 'deserialize' );
      assert.typeOf ( serializer.deserialize, 'function' );
      assert.throws ( serializer.deserialize, Error );
    }
  }

};
