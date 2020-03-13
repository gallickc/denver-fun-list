exports.handler = async event => {
    const subject = event.queryStringParameters.name || 'World'
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `Hello ${subject}!`,
        })
    }
}