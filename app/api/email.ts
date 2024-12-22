'use client'

// src/pages/api/email.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const COLAB_NOTEBOOK_URL = process.env.COLAB_NOTEBOOK_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { context } = req.body;
    
    const response = await axios.post(`${COLAB_NOTEBOOK_URL}/analyze_email`, {
      context,
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}