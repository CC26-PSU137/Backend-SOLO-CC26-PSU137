import axios from 'axios';
import FormData from 'form-data';

import fs from 'fs';

const predictImage = async (imagePath) => {
  try {
    const formData = new FormData();

    const fileBuffer =
      fs.readFileSync(imagePath);

    formData.append(
      'file',
      fileBuffer,
      {
        filename: 'image.png',
      }
    );

    const response = await axios.post(
      process.env.AI_SERVICE_URL,

      formData,

      {
        headers: formData.getHeaders(),

        timeout: 10000,
      }
    );

    if (!response.data.prediction) {
      throw new Error(
        'Invalid AI response'
      );
    }

    return response.data;
  } catch (error) {
    console.error(error.message);

    throw new Error(
      'Failed to connect AI service'
    );
  }
};

export default predictImage;