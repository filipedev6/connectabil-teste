print('Start MongoDB initialization...');
try {
    rs.initiate({
        _id: 'rs0',
        members: [{
            _id: 0,
            host: 'mongodb:27017'
        }]
    });
} catch (error) {
    print('Error initializing replica set:', error);
}
print('MongoDB initialization completed.');