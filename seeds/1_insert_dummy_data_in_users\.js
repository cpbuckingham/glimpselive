exports.seed = function ( knex, Promise ) {
    // Deletes ALL existing entries
    return knex( 'users' ).del()
        .then( function () {
            return Promise.all( [
                // Inserts seed entries
                knex( 'users' ).insert( {
                    id: 1,
                    username: 'JTongay',
                    admin: true,
                    first_name: 'Joey',
                    last_name: 'Tongay',
                    email: 'joey.tongay@gmail.com'
                } ),
                knex( 'users' ).insert( {
                    id: 2,
                    username: 'batman',
                    admin: false,
                    first_name: 'Bruce',
                    last_name: 'Wayne',
                    email: 'imnotbatman@gmail.com'
                } ),
                knex( 'users' ).insert( {
                    id: 3,
                    username: '1337N1NJA',
                    admin: false,
                    first_name: 'Erin',
                    last_name: 'Miller',
                    email: 'millere729@yahoo.com'
                } )
            ] );
        } );
};
