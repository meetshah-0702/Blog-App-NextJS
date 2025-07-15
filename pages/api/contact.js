import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        if (!name || name.trim() === '' || !message || message.trim() === '' || !email || !email.includes('@')) {
            res.status(422).json({
                success: false,
                message: 'Please provide the valid input'
            });

            return;
        }

        const newMessage = {
            name: name,
            email: email,
            message: message
        };

        let client;

        const connectionString = `mongodb+srv://root:manager@cluster0.2cokqwg.mongodb.net/${process.env.mongodb_database}`;

        console.log('connect', connectionString);

        try {
            client = await MongoClient.connect(connectionString);
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to connect to database!!'
            });

            return;
        }

        const db = client.db();

        try {
            const result = await db.collection('messages').insertOne(newMessage);
            newMessage.id = result.insertedId;
        } catch (error) {
            client.close();
            res.status(500).json({
                success: false,
                message: 'Message sent successfully!!'
            });
            return;
        }

        client.close();
        res.status(201).json({
            success: true,
            message: 'Message submitted successfully!'
        });
    }
}

export default handler;