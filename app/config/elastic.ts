import elastic from 'elasticsearch';
const elastic_search_endpoint = process.env.ELASTIC_SEARCH_ENDPOINT;
const elasticClient = new elastic.Client({
    host: elastic_search_endpoint,
});

export default elasticClient;
