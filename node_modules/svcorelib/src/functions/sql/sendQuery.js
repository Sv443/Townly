const isEmpty = require("../isEmpty");
const reserialize = require("../reserialize");

const { SqlConnectionNotEstablishedError } = require("../../classes/Errors");



function sendQuery(connection, query, options, ...insertValues)
{
    return new Promise((pResolve, pReject) => {
        if(isEmpty(connection) || (connection && !["authenticated", "connected"].includes(connection.state)))
            throw new SqlConnectionNotEstablishedError(`DB connection was not established yet or the parameter "connection" is not of type "mysql.Connection". Current connection state is "${connection.state || "(invalid)"}"`);

        if(Array.isArray(insertValues[0]))
            insertValues = insertValues[0];

        let preparedQuery = Array.isArray(insertValues) ? connection.format(query, insertValues) : query;

        if(typeof options == "object" && !options.sql)
            options.sql = preparedQuery;

        if(typeof options != "object")
        {
            options = {
                sql: preparedQuery
            }
        }

        connection.query(options, (err, result) => {
            if(err)
                return pReject(err);
            else
            {
                try
                {
                    if(pResolve)
                        return pResolve(reserialize(result));
                }
                catch(err)
                {
                    return pReject(err);
                }
            }
        });
    });
}

module.exports = sendQuery;
