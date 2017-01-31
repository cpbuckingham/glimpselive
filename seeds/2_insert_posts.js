exports.seed = function ( knex, Promise ) {
    // Deletes ALL existing entries
    return knex( 'posts' ).del()
        .then( function () {
            return Promise.all( [
                // Inserts seed entries
                knex( 'posts' ).insert( {
                    id: 1,
                    title: 'cam first post',
                    body: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
                    user_id: 1
                } ),
                knex( 'posts' ).insert( {
                    id: 2,
                    title: 'jam first post',
                    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
                    user_id: 2
                } ),
                knex( 'posts' ).insert( {
                    id: 3,
                    title: 'bam first post',
                    body: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequa',
                    user_id: 3
                } ),
                knex( 'posts' ).insert( {
                    id: 4,
                    title: 'cam second post',
                    body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo',
                    user_id: 1
                } ),
                knex( 'posts' ).insert( {
                    id: 5,
                    title: 'jam second post',
                    body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo',
                    user_id: 2
                } ),
                knex( 'posts' ).insert( {
                    id: 6,
                    title: 'bam second post',
                    body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo',
                    user_id: 3
                } )
            ] );
        } );
};
