import { DB } from '../../app/config/database';

const migrations = [
    require('./usersMigration'),
    require('./messagesMigration'),
    require('./repliesMigration')
]

async function main() {
    for (let i = 0; i < migrations.length; i++) {
        await migrations[i]();
    }
}

main().
catch(err => console.log(err))
.finally(_ => DB.close())