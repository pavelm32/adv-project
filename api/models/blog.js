const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Укажите заголовок статьи'],
    },
    html: {
        type: String,
        required: [true, 'Укажите содержимое статьи'],
    },
    date: {
        type: Date,
        default: Date.now,
        required: [true, 'Укажите дату публикации'],
    },
});

// просим mongoose сохранить модель для ее дальнейшего использования
mongoose.model('blog', BlogSchema);