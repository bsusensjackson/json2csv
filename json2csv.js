
// Module for parsing JSON into CSV
var csvConverter = {
  convert: function (objArray) {
    var array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    var headers = Object.keys(array[0]);
    return this.parseHeaders(headers, array);
  },
  
  parseHeaders: function(headers, array) {
    var str = '';
    headers.forEach(function(item) {
      str += item + ',';
    });
    str += '\r\n';
    return this.parseBody(array, str);
  },
 
  parseBody: function(array, str) {
    var regex, value, line;

    array.forEach(function (item, index) {
      line = '';
      for ( index in item ) {
        if ( line !== '' ) { 
          line += ','; 
        }
          regex = /\,/;
          value = item[index];
       
        if (typeof value  === "string") {
          value = regex.test(value) ? '"' + value + '"' : value;
        }
        line += value;
      }
      str += line + '\r\n';
    });
    return str;
  }
}
