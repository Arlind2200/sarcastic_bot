import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { OpenAI } from 'openai'; // Import OpenAI class

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // Initialize OpenAI correctly

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from Chaplin!'
  })
})

app.post('/', async (req, res) => {
  console.log('dasdas', req, res)
  try {
    const prompt = req.body.prompt;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [],
      temperature: 0.5,
      max_tokens: 256,
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})


app.post('/test', async (req, res) => {
  console.log('test: ', req, res)
  res.status(200).send({
      bot: "chaplin"
    });
})

app.listen(5000, () => console.log('AI server started on port http://localhost:5000/'))
