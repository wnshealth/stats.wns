import Events from './events';

class Store extends Events {
  constructor( data ) {
    data = data || {};
    this.setData( data );
  }

  getData() {
    return this.data;
  }

  setData( data ) {
    this.data = data;
  }

  get( key ) {
    return this.data[ key ];
  }

  set( key, val ) {
    var attrs = {};
    var prop;

    if ( 'object' === typeof key )
      attrs = key;
    else
      attrs[ key ] = val;

    for ( prop in attrs ) {
      this.data[ prop ] = attrs[ prop ];
      this.emit( prop + ':change', attrs[ prop ] );
    }

    return undefined !== val ? val : key;
  }
}

export default Store;
