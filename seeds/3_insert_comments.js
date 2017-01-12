exports.seed = function ( knex, Promise ) {
    // Deletes ALL existing entries
    return knex( 'comments' ).del()
        .then( function () {
            return Promise.all( [
                // Inserts seed entries
                knex( 'comments' ).insert( {
                    id: 100000000,
                    content: 'no way',
                    user_id: 100000002,
                    post_id: 100000001
                } ),
                knex( 'comments' ).insert( {
                    id: 100000001,
                    content: 'seriously tho...',
                    user_id: 100000001,
                    post_id: 100000000
                } ),
                knex( 'comments' ).insert( {
                    id: 100000002,
                    content: 'why would you do this?',
                    user_id: 100000001,
                    post_id: 100000002
                } )
            ] );
        } );
};
