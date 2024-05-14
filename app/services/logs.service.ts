import elasticClient from "../config/elastic";

enum actions {
    CUSTOMER_CREATED = 'LOG_ACTION_CUSTOMER_CREATED',
    CUSTOMER_UPDATED = 'LOG_ACTION_CUSTOMER_UPDATED',
    CUSTOMER_DELETED = 'LOG_ACTION_CUSTOMER_DELETED',
    ROUTER_CREATED = 'LOG_ACTION_ROUTER_CREATED',
    ROUTER_UPDATED = 'LOG_ACTION_ROUTER_UPDATED',
    ROUTER_DELETED = 'LOG_ACTION_ROUTER_DELETED',
}

async function logActivity(action: actions, details: unknown) {
    elasticClient.index({
        index: 'logs',
        body: {
            action,
            details,
            timestamp: new Date(),
        },
        type: "_doc",
        
    });
}

async function searchLogs(action?: actions) {
    try {
        const query = action ? { match: { action } } : { match_all: {} };

        const data = await elasticClient.search({
            index: 'logs',
            body: {
                query
            }
        });
        return data.hits.hits;
    } catch (error) {
        console.error('Error retrieving logs:', error);
        throw error;
    }
}

export { logActivity, searchLogs, actions };