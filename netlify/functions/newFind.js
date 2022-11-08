"use strict"

const mongoPromise = require('./mongoDB');

const headers = require('./headersCORS');

exports.handler = async(event, context) => {

    if (event.httpMethod == "OPTIONS") {
        return { statusCode: 200, headers, body: "OK" };
    }

    try {
        const client = await mongoPromise;
        const id = parseInt(event.path.split("/").reverse()[0]);

        const news =
            await client.db("newstore").collection("news").find({ _id: id }).toArray();

        return { statusCode: 200, headers, body: JSON.stringify(news) };
    } catch (error) {
        console.log(error);
        return { statusCode: 400, headers, body: JSON.stringify(error) };
    }
};