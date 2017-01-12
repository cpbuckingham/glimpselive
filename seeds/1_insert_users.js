exports.seed = function ( knex, Promise ) {
    // Deletes ALL existing entries
    return knex( 'users' ).del()
        .then( function () {
            return Promise.all( [
                // Inserts seed entries
                knex( 'users' ).insert( {
                    id: 100000000,
                    username: 'cam',
                    admin: true,
                    first_name: 'cam',
                    last_name: 'buckingham',
                    hashed_password: '$2a$12$GE6WR8XyHfprF7gNhTcCPenDsmgOrUM2LB5sz50wA0UJsQzddU1mu',
                    avatar: 'https://octodex.github.com/images/homercat.png',
                    email: 'cam@gmail.com'
                } ),
                knex( 'users' ).insert( {
                    id: 100000001,
                    username: 'jam',
                    admin: false,
                    first_name: 'jam',
                    last_name: 'buckingham',
                    hashed_password: '$2a$12$GE6WR8XyHfprF7gNhTcCPenDsmgOrUM2LB5sz50wA0UJsQzddU1mu',
                    avatar: 'https://octodex.github.com/images/octocat-de-los-muertos.jpg',
                    email: 'jam@gmail.com'
                } ),
                knex( 'users' ).insert( {
                    id: 100000002,
                    username: 'bam',
                    admin: false,
                    first_name: 'bam',
                    last_name: 'bam',
                    hashed_password: '$2a$12$GE6WR8XyHfprF7gNhTcCPenDsmgOrUM2LB5sz50wA0UJsQzddU1mu',
                    avatar: 'https://octodex.github.com/images/filmtocat.png',
                    email: 'bam@gmail.com'
                } )
            ] );
        } );
};
