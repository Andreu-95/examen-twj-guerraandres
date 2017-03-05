/**
 * Pasteleria.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    pasteles: {
      collection: 'Pastel',
      via: 'idPasteleria'
    }
  },

  afterDestroy: function (destroyedRecords, cb) {
    Pastel.destroy({
      idPasteleria: _.pluck(destroyedRecords, 'id')
    }).exec(cb)
  }
};

