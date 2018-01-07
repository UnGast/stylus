/*!
 * Stylus - @block
 * Copyright (c) Automattic <developer.wordpress.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node')
  , nodes = require('./');

/**
 * Initialize a new `@block` node.
 *
 * @api public
 */

var Atblock = module.exports = function Atblock(){
  Node.call(this);
};

/**
 * Return `block` nodes.
 */

Atblock.prototype.__defineGetter__('nodes', function(){
  return this.block.nodes;
});

/**
 * Inherit from `Node.prototype`.
 */

Atblock.prototype.__proto__ = Node.prototype;

/**
 * Get the expression of the last property with name `key` in the block property.
 * 
 * @param {String} key
 * @return {Node}
 * @api public
 */
Atblock.prototype.get = function(key) {
  console.log("IN ATBLOCK GET")
  console.log(this)

  var value = nodes.null;

  for (var i = 0; i < this.nodes.length; i++) {
    var property = this.nodes[i];
    if (property.name === key) {
      value = property.expr;
    }
  }

  return value;
};

/**
 * Set the last property with name `key` in the block property to `val` or add new property.
 *
 * @param {String} key
 * @param {Node} val
 * @return {Atblock} for chaining
 * @api public
 */

Atblock.prototype.set = function(key, val){
  var property = null;
  
  for (var i = 0; i < this.nodes.length; i++) {
    if (this.nodes[i].name === key) {
      property = this.nodes[i];
    }
  }

  if (!property) {
    property = nodes.Property([], val)
    property.name = key
    this.nodes.push(property)
  }
  else {
    property.expr = val
  }

  return this;
};

/**
 * Return a clone of this node.
 *
 * @return {Node}
 * @api public
 */

Atblock.prototype.clone = function(parent){
  var clone = new Atblock;
  clone.block = this.block.clone(parent, clone);
  clone.lineno = this.lineno;
  clone.column = this.column;
  clone.filename = this.filename;
  return clone;
};

/**
 * Return @block.
 *
 * @return {String}
 * @api public
 */

Atblock.prototype.toString = function(){
  return '@block';
};

/**
 * Return a JSON representation of this node.
 *
 * @return {Object}
 * @api public
 */

Atblock.prototype.toJSON = function(){
  return {
    __type: 'Atblock',
    block: this.block,
    lineno: this.lineno,
    column: this.column,
    fileno: this.fileno
  };
};
