exports.seed = function ( knex, Promise ) {
    return knex( 'buddies' ).del()
        .then( function () {
            return Promise.all( [
                knex( 'buddies' ).insert( {
                    id: 1,
                    user_id: 3,
                    buddy_id: 2
                } ),
                knex( 'buddies' ).insert( {
                    id: 2,
                    user_id: 2,
                    buddy_id: 1
                } ),
                knex( 'buddies' ).insert( {
                    id: 3,
                    user_id: 1,
                    buddy_id: 3
                } )
            ] );
        } );
      };
