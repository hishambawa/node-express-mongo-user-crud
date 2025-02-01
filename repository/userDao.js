const {MongoClient, ObjectId} = require('mongodb');

class UserDao {
    constructor() {
        // get the db client
        const url = process.env.DB_URL || '';
        const client = new MongoClient(url);
        
        // connect to the database
        client.connect().then(() => {
            console.log('Successfully connected to the database');
        }).catch((err) => {
            console.error('An error occurred while connecting to the database', err);
            throw err;
        });

        // ping the database
        client.db().admin().ping().then(() => {
            console.log('Successfully pinged the database');
        }).catch((err) => {
            console.error('An error occurred while pinging the database', err);
            throw err;
        });

        const dbName = process.env.DB || 'adv-server-side';
        const collectionName = process.env.COLLECTION || 'users';
        
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        this.collection = collection;
    }

    async addUser(user) {
        const result = await this.collection.insertOne(user);

        if(result.acknowledged) {
            return this.createSuccessResponse(201, {
                message: 'Successfully created the user',
                user: user
            });
        } else {
            return this.createErrorResponse(500, 'Failed to create user');
        }
    }

    async getUsers() {
        const users = await this.collection.find().toArray();

        return this.createSuccessResponse(200, {
            users: users
        });
    }

    async getUser(id) {
        const user = await this.collection.findOne(
            { _id: ObjectId.createFromHexString(id) }
        );

        if(user) {
            return this.createSuccessResponse(200, user);
        } else {
            return this.createErrorResponse(404, 'User not found');
        }
    }

    async updateUser(id, user) {
        const result = await this.collection.updateOne(
            { _id: ObjectId.createFromHexString(id) }, 
            { $set: user }
        );

        if(result.modifiedCount === 1) {
            return this.createSuccessResponse(200, {
                message: 'Successfully updated the user',
                user: user,
                id: id
            });
        } else {
            return this.createErrorResponse(500, 'Failed to update user');
        }
    }

    async deleteUser(id) {        
        const result = await this.collection.deleteOne(
            { _id: ObjectId.createFromHexString(id) }
        );

        if(result.deletedCount === 1) {
            return this.createSuccessResponse(200, {
                message: 'Successfully deleted the user',
                id: id
            });
        } else {
            return this.createErrorResponse(500, 'Failed to delete user');
        }
    }

    createSuccessResponse(status, body) {
        return {
            status: status,
            body: body
        };
    }

    createErrorResponse(status, message) {
        return {
            status: status,
            body: {
                message: message
            }
        };
    }
}

module.exports = { UserDao };