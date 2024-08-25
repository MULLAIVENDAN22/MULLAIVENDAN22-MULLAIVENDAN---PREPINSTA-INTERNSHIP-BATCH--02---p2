// // server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();
// const port = 3000;

// const cors = require('cors');

// app.use(cors({
//     origin: ['http://127.0.0.1:5500'], // allow requests from this origin
//     credentials: true, // allow credentials (e.g. cookies) to be sent
// }));

// // const path = require('path');

// // Middleware to parse JSON
// app.use(express.json());

// // const file = path.join(__dirname,index.html)

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/food_base', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('Failed to connect to MongoDB', err));


// // Mongoose schema and model
// const itemSchema = new mongoose.Schema({
//     name: String,
//     foodGroup: String,
//     description: String,
//     nutritionalInformation: String,
//     servingSize: String,
//     allergens: String,
//     ingredients: String,
//     preparationMethods: String,
//     healthBenefits: String,
//     bestPractices: String
// });
// const Item = mongoose.model('Item', itemSchema);

// app.post('/item', async (req, res) => {
//     try {
//         const item = new Item({
//             name: req.body.name,
//             foodGroup: req.body.foodGroup,
//             description: req.body.description,
//             nutritionalInformation: req.body.nutritionalInformation,
//             servingSize: req.body.servingSize,
//             allergens: req.body.allergens,
//             ingredients: req.body.ingredients,
//             preparationMethods: req.body.preparationMethods,
//             healthBenefits: req.body.healthBenefits,
//             bestPractices: req.body.bestPractices
//         });
//         await item.save();
//         res.status(201).json({ message: 'Item added', item });
//         console.log("item added");

//     } catch (err) {
//         console.error('Error adding item:', err);
//         res.status(500).json({ message: 'Error adding item', error: err });
//         console.log("item not added");
//     }
// });


// // Route to get all items (GET request)
// app.get('/data/:id', async (req, res) => {
//     try {
//       const id = req.params.id;
//       const item = await Item.findById(id);
//       if (!item) {
//         res.status(404).json({ message: 'Item not found' });
//       } else {
//         res.status(200).json(item);
//       }
//     } catch (err) {
//       console.error('Error fetching item:', err);
//       res.status(500).json({ message: 'Error fetching item', error: err });
//     }
//   });


// app.put('/data/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const item = await Item.findByIdAndUpdate(id, req.body, { new: true });
//         if (!item) {
//             res.status(404).json({ message: 'Item not found' });
//         } else {
//             res.status(200).json({ message: 'Item updated', item });
//         }
//     } catch (err) {
//         console.error('Error updating item:', err);
//         res.status(500).json({ message: 'Error updating item', error: err });
//     }
// });

// // Route to delete an item (DELETE request)
// app.delete('/data/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         await Item.findByIdAndRemove(id);
//         res.status(200).json({ message: 'Item deleted' });
//     } catch (err) {
//         console.error('Error deleting item:', err);
//         res.status(500).json({ message: 'Error deleting item', error: err });
//     }
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });




//  -----------------------------------  main code   ------------------------------------

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// app.use(bodyParser.json());

// app.use(cors({
//     origin: ['http://127.0.0.1:5500', 'http://localhost:5500'], 
//     credentials: true,
// }));

// mongoose.connect('mongodb://localhost:27017/food_base', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log("Database connected successfully"))
// .catch(() => console.log("Database connection failed"));

// const foodSchema = new mongoose.Schema({
//     name: String,
//     foodGroup: String,
//     description: String,
//     nutritionalInformation: String,
//     servingSize: String,
//     allergens: String,
//     ingredients: String,
//     preparationMethods: String,
//     healthBenefits: String,
//     bestPractices: String
// });

// const Food = mongoose.model('Food', foodSchema);

// app.get('/data', async (req, res) => {
//     try {
//         const items = await Food.find();
//         res.json(items);
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching data' });
//     }
// });

// app.post('/data', async (req, res) => {
//     try {
//         const newItem = new Food(req.body);
//         await newItem.save();
//         res.status(201).json(newItem); // Return the created item, including its ID
//     } catch (error) {
//         res.status(400).json({ error: 'Error creating item' });
//     }
// });

// app.patch('/data/:id', async (req, res) => {
//     console.log(`PATCH request received for ID: ${req.params.id}`);
//     try {
//         const item = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!item) {
//             return res.status(404).json({ error: 'Item not found' });
//         }
//         res.json(item);
//     } catch (error) {
//         console.error(`Error updating item with ID ${req.params.id}:`, error);
//         res.status(400).json({ error: 'Error updating item' });
//     }
// });

// app.delete('/data/:id', async (req, res) => {
//     console.log(`DELETE request received for ID: ${req.params.id}`);
//     try {
//         const item = await Food.findByIdAndDelete(req.params.id);
//         if (!item) {
//             return res.status(404).json({ error: 'Item not found' });
//         }
//         res.json(item);
//     } catch (error) {
//         console.error(`Error deleting item with ID ${req.params.id}:`, error);
//         res.status(400).json({ error: 'Error deleting item' });
//     }
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });



const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500'], 
    credentials: true,
}));

const uri = "mongodb+srv://MULLAIVENDAN:FZWcHlzYPXi48m1o@cluster0.4rrex.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Updated MongoDB Atlas connection string
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Database connected successfully"))
.catch((e) => console.log("Database connection failed" , e));

const foodSchema = new mongoose.Schema({
    name: String,
    foodGroup: String,
    description: String,
    nutritionalInformation: String,
    servingSize: String,
    allergens: String,
    ingredients: String,
    preparationMethods: String,
    healthBenefits: String,
    bestPractices: String
});

const Food = mongoose.model('Food', foodSchema);

app.get('/data', async (req, res) => {
    try {
        const items = await Food.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});

app.post('/data', async (req, res) => {
    try {
        const newItem = new Food(req.body);
        await newItem.save();
        res.status(201).json(newItem); // Return the created item, including its ID
    } catch (error) {
        res.status(400).json({ error: 'Error creating item' });
    }
});

app.patch('/data/:id', async (req, res) => {
    console.log(`PATCH request received for ID: ${req.params.id}`);
    try {
        const item = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        console.error(`Error updating item with ID ${req.params.id}:`, error);
        res.status(400).json({ error: 'Error updating item' });
    }
});

app.delete('/data/:id', async (req, res) => {
    console.log(`DELETE request received for ID: ${req.params.id}`);
    try {
        const item = await Food.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        console.error(`Error deleting item with ID ${req.params.id}:`, error);
        res.status(400).json({ error: 'Error deleting item' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});



