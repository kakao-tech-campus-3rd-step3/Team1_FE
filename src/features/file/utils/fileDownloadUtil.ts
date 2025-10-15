import axios from 'axios';

export const downloadFromS3 = async (
  url: string,
  headers: Record<string, string>,
  fileName: string,
) => {
  const res = await axios.get(url, { headers, responseType: 'blob' });

  const blobUrl = window.URL.createObjectURL(res.data);
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = fileName ;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(blobUrl);
};
