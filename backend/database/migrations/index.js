import { DB } from '../../app/core/database';

const migrations = [
    require('./usersMigration'),
    require('./messagesMigration'),
    require('./repliesMigration')
]

async function main() {
    const db = await DB.connect();

    for (let i = 0; i < migrations.length; i++) {
        await migrations[i](db);
    }
}

main().
catch(err => console.log(err))
.finally(async () => await DB.close())