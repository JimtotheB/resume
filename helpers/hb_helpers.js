/**
 * @file hb_helpers
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Resume_generator
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

/**
 *
 * @module hb_helpers
 */
var _ = require('lodash');

module.exports = function(hb){
  hb.registerHelper('link', function(obj) {
    return new hb.SafeString("<a href='" + obj + "'>" + obj + "</a>")
  })

  hb.registerHelper('description', function(obj) {
    if(_.isString(obj)){
      return obj
    }
    if(_.isArray(obj)){
     return obj.join(' ')
    }
  })
}