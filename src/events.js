class Events {
  constructor() {
    this.topics = {};
    this.token = 0;
  }

  emit( topic, args ) {
    if ( !this.topics[ topic ] ) return false;

    var args = Array.prototype.slice.call( arguments, 1 );
    var subs = this.topics[ topic ];
    var l = subs ? subs.length : 0;

    while ( l-- ) {
      var sub = subs[ l ];

      sub.fn.apply( sub.ctx, args );
    }
  }

  on( topic, fn, ctx ) {
    var token = ++this.token;

    ( this.topics[ topic ] = this.topics[ topic ] || [] )
      .push({
        fn: fn,
        ctx: ctx || null,
        token: token
      });

    return token;
  }

  off( topic, token ) {
    var callbacks = this.topics[ topic ];
    var i = 0;
    var l = callbacks.length;

    for ( ; i < l; i++ )
      if ( callbacks[ i ].token === token )
        return callbacks.splice( i, 1 );

    return false;
  }
}

export default Events;
