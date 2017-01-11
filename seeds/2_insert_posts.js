exports.seed = function ( knex, Promise ) {
    // Deletes ALL existing entries
    return knex( 'posts' ).del()
        .then( function () {
            return Promise.all( [
                // Inserts seed entries
                knex( 'posts' ).insert( {
                    id: 1,
                    title: 'Hey there',
                    body: 'Watch this',
                    user_id: 2
                } ),
                knex( 'posts' ).insert( {
                    id: 2,
                    title: 'Howdy',
                    body: 'Whats up?',
                    user_id: 1
                } ),
                knex( 'posts' ).insert( {
                    id: 3,
                    title: 'Check this out',
                    body: 'I did things',
                    user_id: 3
                } )
            ] );
        } );
};
