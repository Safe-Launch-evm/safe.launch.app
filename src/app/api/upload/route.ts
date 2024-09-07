// Import necessary modules
import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile } from 'fs/promises';
import { handleDelete, handleUpload } from '@/config/cloud';

// Define the POST handler for the file upload
export const POST = async (req: Request) => {
  // Parse the incoming form data
  const formData = await req.formData();

  // Get the file from the form data
  const file = formData.get('image') as File | null;
  const folder = formData.get('folder') as string | null;

  // Check if a file is received
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'No valid file received.' }, { status: 400 });
  }

  // Convert the file data to a Buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // Convert the buffer to a base64 string
  const base64String = buffer.toString('base64');
  const dataUri = `data:${file.type};base64,${base64String}`;

  // Replace spaces in the file name with underscores
  const filename = file.name.replaceAll(' ', '_');
  console.log(filename);

  try {
    const res = await handleUpload(dataUri, folder ?? 'tokens');
    const result = { url: res.secure_url, image: res.public_id };
    return NextResponse.json({ Message: 'Success', result, status: 201 });
  } catch (error) {
    console.log('Error occurred ', error);
    return NextResponse.json({ Message: 'Failed', result: null, status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  const formData = req.formData();
  const image = (await formData).get('image');
  try {
    const result = await handleDelete(image);
    return NextResponse.json({ Message: 'Success', result, status: 201 });
  } catch (error) {
    console.log('Error occurred ', error);
    return NextResponse.json({ Message: 'Failed', result: null, status: 500 });
  }
};
