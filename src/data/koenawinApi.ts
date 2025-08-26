import axios from 'axios';

export interface KoeNaWinProgress {
  start_date: string | null;
  completed_dates: string[];
}

export async function fetchKoeNaWinProgress(email: string): Promise<KoeNaWinProgress> {
  const res = await axios.post('http://localhost/lotus_shrine/getKoeNaWinProgress.php', { email }, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
  if (res.data?.success) return res.data.data as KoeNaWinProgress;
  throw new Error(res.data?.message || 'Failed to load progress');
}

export async function saveKoeNaWinProgress(email: string, progress: KoeNaWinProgress): Promise<void> {
  const res = await axios.post('http://localhost/lotus_shrine/saveKoeNaWinProgress.php', { email, ...progress }, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
  if (!res.data?.success) throw new Error(res.data?.message || 'Failed to save progress');
}
