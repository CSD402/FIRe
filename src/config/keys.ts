export default {
  mongoURI:
    process.env.MONGO_URI ||
    'mongodb+srv://userr:user@cluster0.jduon.mongodb.net/lessgo?retryWrites=true&w=majority',
  JWT_SECRET: process.env.JWT_SECRET || 'asdsdfdfdgdghgfh',
};
