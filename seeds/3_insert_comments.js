exports.seed = function ( knex, Promise ) {
    return knex( 'comments' ).del()
        .then( function () {
            return Promise.all( [
                knex( 'comments' ).insert( {
                    id: 1,
                    content: 'no way',
                    user_id: 3,
                    post_id: 2
                } ),
                knex( 'comments' ).insert( {
                    id: 2,
                    content: 'seriously tho...',
                    user_id: 2,
                    post_id: 1
                } ),
                knex( 'comments' ).insert( {
                    id: 3,
                    content: 'why would you do this?',
                    user_id: 2,
                    post_id: 3
                } )
            ] );
        } );
      };
