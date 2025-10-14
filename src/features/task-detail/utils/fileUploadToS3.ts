import axios from 'axios';

export const uploadToS3 = async (file: File, url: string, headers: Record<string, string>) => {
  await axios.put(url, file, { headers });
};
