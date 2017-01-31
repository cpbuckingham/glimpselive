exports.seed = function ( knex, Promise ) {
    // Deletes ALL existing entries
    return knex( 'buddies' ).del()
        .then( function () {
            return Promise.all( [
                // Inserts seed entries
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
