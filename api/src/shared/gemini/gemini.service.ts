import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import {
  FileMetadataResponse,
  GoogleAIFileManager,
  UploadFileResponse,
} from '@google/generative-ai/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { writeFileSync } from 'fs';

@Injectable()
export class GeminiService {
  private readonly apikey: string;
  private genAI: GoogleGenerativeAI;
  private fileManager: GoogleAIFileManager;

  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY environment var are required');
    }
    this.apikey = process.env.GEMINI_API_KEY;
    this.genAI = new GoogleGenerativeAI(this.apikey);
    this.fileManager = new GoogleAIFileManager(this.apikey);
  }

  async uploadImage(imageData: string) {
    const buffer = Buffer.from(imageData, 'base64');
    writeFileSync('image.jpg', buffer);
    try {
      const response = await this.fileManager.uploadFile('image.jpg', {
        mimeType: 'image/jpeg',
        displayName: 'Teste',
      });
      return response.file;
    } catch (err) {
      console.error(err);
    }
  }

  async process(prompt: string, metadata: FileMetadataResponse) {
    if (prompt === '') {
      throw new Error('prompt cannot be empty');
    }
    if (!metadata) {
      throw new Error('metadata cannot be empty');
    }
    try {
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
      });
      const result = await model.generateContent([
        {
          fileData: {
            mimeType: metadata.mimeType,
            fileUri: metadata.uri,
          },
        },
        { text: prompt },
      ]);
      return result.response.text();
    } catch (err) {
      console.error(err);
    }
  }

  async listFiles() {
    return await this.fileManager.listFiles();
  }

  async getFileMetadata(filename: string) {
    return await this.fileManager.getFile(filename);
  }
}
