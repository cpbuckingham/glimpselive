exports.seed = function ( knex, Promise ) {
    // Deletes ALL existing entries
    return knex( 'posts' ).del()
        .then( function () {
            return Promise.all( [
                // Inserts seed entries
                knex( 'posts' ).insert( {
                    id: 100000000,
                    title: 'Hey there',
                    body: 'Watch this',
                    user_id: 100000001
                } ),
                knex( 'posts' ).insert( {
                    id: 100000001,
                    title: 'Howdy',
                    body: 'Whats up?',
                    user_id: 100000000
                } ),
                knex( 'posts' ).insert( {
                    id: 100000002,
                    title: 'Check this out',
                    body: 'I did things',
                    user_id: 100000002
                } )
            ] );
        } );
};
