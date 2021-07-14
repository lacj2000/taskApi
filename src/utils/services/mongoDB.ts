import { MongoClient } from 'mongodb';

const urlDB = process.env.DB_MONGO_DB_HOST;
const nameDB = process.env.DB_MONGO_DB_NAME;

let cacheDB=null;
let cacheClient=null;


if (!urlDB){
    throw new Error('mongodbError 01- not found urlDB');
}
if (!nameDB){
    throw new Error('mongodbError 02 - not found nameDB');
}

export async function connectToDB() {
    if (cacheClient && cacheDB){
        return {client:cacheClient, db:cacheDB};
    }
 
    const client = await MongoClient.connect(urlDB);

    const db = await client.db(nameDB);

    cacheDB = db;
    cacheClient = client

    return {client, db}
}

export default connectToDB;