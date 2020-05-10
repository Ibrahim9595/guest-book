const migrations = [
    require('./usersMigration'),
    require('./messagesMigration'),
]

Promise.all(migrations.map(fnc => fnc()))
.then(d => console.log(d))
.catch(err => console.log(err))